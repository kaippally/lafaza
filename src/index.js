import express from 'express';
import { createHash } from 'node:crypto';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { open } from './db.js';
import { bare } from './morph.js';

const db = open();
const app = express();
const PORT = process.env.PORT || 4030;

const TTS_KEY = process.env.GOOGLE_TTS_KEY;
const TTS_VOICE = process.env.GOOGLE_TTS_VOICE || 'ar-XA-Wavenet-B';
const TTS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'tts');

app.use((_req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

const q = (sql) => db.prepare(sql);

app.get('/api/stats', (_req, res) => {
  const s = q(`SELECT COUNT(*) total, SUM(attested) attested FROM slots`).get();
  res.json({
    roots: q('SELECT COUNT(*) n FROM roots').get().n,
    patterns: q('SELECT COUNT(*) n FROM patterns').get().n,
    lexicon: q('SELECT COUNT(*) n FROM lexicon').get().n,
    slots: s.total,
    attested: s.attested,
    vacant: s.total - s.attested,
    fields: q('SELECT field, COUNT(*) n FROM roots GROUP BY field ORDER BY n DESC').all(),
    categories: q('SELECT category, COUNT(*) n FROM patterns GROUP BY category ORDER BY n DESC').all(),
  });
});

app.get('/api/roots', (_req, res) => {
  res.json(q(`
    SELECT r.*,
           (SELECT COUNT(*) FROM slots s WHERE s.root_id = r.id AND s.attested = 1) AS attested,
           (SELECT COUNT(*) FROM slots s WHERE s.root_id = r.id) AS total
    FROM roots r ORDER BY attested DESC, r.letters
  `).all());
});

app.get('/api/patterns', (_req, res) => {
  res.json(q('SELECT * FROM patterns ORDER BY productivity DESC, name').all());
});

app.get('/api/root/:id', (req, res) => {
  const root = q('SELECT * FROM roots WHERE id = ?').get(Number(req.params.id));
  if (!root) return res.status(404).json({ error: 'no such root' });
  const slots = q(`
    SELECT s.*, p.name pattern, p.category, p.fn, p.form verb_form, p.productivity
    FROM slots s JOIN patterns p ON p.id = s.pattern_id
    WHERE s.root_id = ? ORDER BY p.productivity DESC, p.name
  `).all(root.id);
  res.json({ root, slots });
});

// The point of the whole app: legal forms with no assigned referent, best first.
app.get('/api/vacant', (req, res) => {
  const { field, category, minScore = 0, limit = 200 } = req.query;
  const where = ['s.attested = 0', 's.score >= ?'];
  const args = [Number(minScore)];
  if (field) { where.push('r.field = ?'); args.push(field); }
  if (category) { where.push('p.category = ?'); args.push(category); }
  args.push(Number(limit));
  res.json(q(`
    SELECT s.form, s.form_bare, s.predicted, s.score, s.flags, s.segments,
           r.letters root, r.en root_en, r.field,
           p.name pattern, p.category, p.fn
    FROM slots s
    JOIN roots r ON r.id = s.root_id
    JOIN patterns p ON p.id = s.pattern_id
    WHERE ${where.join(' AND ')}
    ORDER BY s.score DESC, r.letters LIMIT ?
  `).all(...args));
});

app.get('/api/matrix', (req, res) => {
  const cat = req.query.category;
  const pats = cat === 'all'
    ? q('SELECT * FROM patterns ORDER BY productivity DESC').all()
    : cat
      ? q('SELECT * FROM patterns WHERE category = ? ORDER BY productivity DESC').all(cat)
      : q('SELECT * FROM patterns ORDER BY productivity DESC LIMIT 20').all();
  const ids = pats.map((p) => p.id);
  const slots = q(`
    SELECT root_id, pattern_id, form, attested, score, predicted, segments
    FROM slots WHERE pattern_id IN (${ids.map(() => '?').join(',')})
  `).all(...ids);
  res.json({ patterns: pats, roots: q('SELECT * FROM roots ORDER BY letters').all(), slots });
});

app.get('/api/coined', (_req, res) => {
  res.json(q('SELECT * FROM coined ORDER BY id').all());
});

// Google Cloud TTS when a key is configured (Wavenet, best quality); otherwise Google
// Translate's public tts endpoint, which needs no key. Both cached to disk as mp3.
async function cloudTTS(text) {
  const r = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + TTS_KEY, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      input: { text },
      voice: { languageCode: TTS_VOICE.split('-').slice(0, 2).join('-'), name: TTS_VOICE },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 0.85 },
    }),
  });
  if (!r.ok) throw new Error('cloud tts ' + r.status + ' ' + (await r.text()).slice(0, 200));
  return Buffer.from((await r.json()).audioContent, 'base64');
}

// Undocumented but long-stable. No key, no quota signup. Rate-limited by Google, and it can
// change without notice — set GOOGLE_TTS_KEY for the supported path.
async function translateTTS(text) {
  const url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=ar&q=' + encodeURIComponent(text);
  const r = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error('translate tts ' + r.status);
  return Buffer.from(await r.arrayBuffer());
}

app.get('/api/tts', async (req, res) => {
  const text = String(req.query.text || '').trim();
  if (!text) return res.status(400).json({ error: 'text required' });

  mkdirSync(TTS_DIR, { recursive: true });
  const tag = TTS_KEY ? TTS_VOICE : 'translate';
  const file = join(TTS_DIR, createHash('sha1').update(tag + '|' + text).digest('hex') + '.mp3');

  try {
    if (!existsSync(file)) {
      writeFileSync(file, TTS_KEY ? await cloudTTS(text) : await translateTTS(text));
    }
    res.set('content-type', 'audio/mpeg').set('cache-control', 'public, max-age=86400').send(readFileSync(file));
  } catch (err) {
    res.status(502).json({ error: String(err.message), engine: tag });
  }
});

// q   — Arabic form, diacritics ignored
// ctx — free-text meaning: searches the projected gloss, the root's English senses,
//       the pattern's function and the semantic field. Both may be combined.
app.get('/api/search', (req, res) => {
  const term = bare(String(req.query.q || '').trim());
  const ctx = String(req.query.ctx || '').trim().toLowerCase();
  const status = req.query.status;
  if (!term && !ctx) return res.json([]);

  const where = [];
  const args = [];
  if (term) { where.push('s.form_bare LIKE ?'); args.push('%' + term + '%'); }
  if (ctx) {
    const cols = ['s.predicted', 'r.en', 'r.ger', 'r.noun', 'p.fn', 'r.field', 'p.category'];
    where.push('(' + cols.map((c) => `lower(${c}) LIKE ?`).join(' OR ') + ')');
    for (const _ of cols) args.push('%' + ctx + '%');
  }
  if (status === 'attested') where.push('s.attested = 1');
  if (status === 'vacant') where.push('s.attested = 0');

  res.json(q(`
    SELECT s.form, s.form_bare, s.attested, s.predicted, s.score, s.segments,
           r.letters root, r.en root_en, r.field, p.name pattern, p.fn
    FROM slots s
    JOIN roots r ON r.id = s.root_id
    JOIN patterns p ON p.id = s.pattern_id
    WHERE ${where.join(' AND ')}
    ORDER BY s.score DESC, s.attested LIMIT 200
  `).all(...args));
});

app.listen(PORT, () => console.log(`lafaza api  http://localhost:${PORT}`));
