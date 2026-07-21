import { open, SCHEMA } from './db.js';
import { patterns } from './seed/patterns.js';
import { roots } from './seed/roots.js';
import { lexicon } from './seed/lexicon.js';
import { coined } from './seed/coined.js';
import { apply, bare, phonotactics, gloss, segment, segmentByRoot } from './morph.js';

const db = open();
// lexicon survives a rebuild so imported wordlists are not lost; everything else is derived.
db.exec('DROP TABLE IF EXISTS slots; DROP TABLE IF EXISTS roots; DROP TABLE IF EXISTS patterns; DROP TABLE IF EXISTS coined;');
db.exec(SCHEMA);

const insRoot = db.prepare('INSERT INTO roots (letters,r1,r2,r3,en,ger,noun,field,type) VALUES (?,?,?,?,?,?,?,?,?)');
for (const r of roots) insRoot.run(r.letters, r.r1, r.r2, r.r3, r.en, r.ger, r.noun, r.field, r.type);

const insPat = db.prepare('INSERT INTO patterns (name,template,category,form,fn,frame,productivity,affinity,hollow_safe) VALUES (?,?,?,?,?,?,?,?,?)');
for (const p of patterns) {
  insPat.run(p.name, p.template, p.category, p.form, p.fn, p.frame, p.productivity, JSON.stringify(p.affinity), p.hollowSafe ? 1 : 0);
}

const insCoin = db.prepare('INSERT INTO coined (form,en,root,root_sense,pattern,literal,note,segments) VALUES (?,?,?,?,?,?,?,?)');
for (const c of coined) {
  insCoin.run(c.form, c.en, c.root, c.rootSense, c.pattern, c.literal, c.note, JSON.stringify(segmentByRoot(c.form, c.root)));
}

const insLex = db.prepare('INSERT OR IGNORE INTO lexicon (form_bare, gloss, source) VALUES (?, NULL, ?)');
for (const w of lexicon) insLex.run(w, 'core');
// every curated coinage is by definition attested
for (const c of coined) insLex.run(bare(c.form), 'coined');

const attested = new Set(db.prepare('SELECT form_bare FROM lexicon').all().map((r) => r.form_bare));
const dbRoots = db.prepare('SELECT * FROM roots').all();
const dbPats = db.prepare('SELECT * FROM patterns').all();

// Pass 1 — generate every legal root x pattern cell and check attestation.
const cells = [];
let skipped = 0;
for (const r of dbRoots) {
  const radicals = [r.r1, r.r2, r.r3];
  for (const p of dbPats) {
    if (r.type === 'hollow' && !p.hollow_safe) { skipped++; continue; }
    const form = apply(p.template, radicals);
    const fb = bare(form);
    const { factor, flags } = phonotactics(radicals, p);
    cells.push({
      root: r, pattern: p, form, form_bare: fb,
      attested: attested.has(fb) ? 1 : 0,
      predicted: gloss(p.frame, r),
      segments: segment(p.template, radicals),
      phon: factor, flags,
    });
  }
}

// Pass 2 — a root already carrying many attested derivatives is a "live" root;
// its empty slots are the ones worth coining into.
const liveness = new Map();
for (const r of dbRoots) {
  const own = cells.filter((c) => c.root.id === r.id);
  const n = own.filter((c) => c.attested).length;
  liveness.set(r.id, own.length ? Math.min(1, n / Math.min(14, own.length)) : 0);
}

const insSlot = db.prepare(
  'INSERT INTO slots (root_id,pattern_id,form,form_bare,attested,attested_gloss,predicted,score,flags,segments) VALUES (?,?,?,?,?,?,?,?,?,?)'
);
for (const c of cells) {
  const affinity = JSON.parse(c.pattern.affinity).includes(c.root.field) ? 1 : 0.55;
  const life = 0.5 + 0.5 * liveness.get(c.root.id);
  const score = c.pattern.productivity * affinity * life * c.phon * 100;
  insSlot.run(
    c.root.id, c.pattern.id, c.form, c.form_bare, c.attested, null,
    c.predicted, Math.round(score * 10) / 10, JSON.stringify(c.flags), JSON.stringify(c.segments)
  );
}

const att = cells.filter((c) => c.attested).length;
console.log(`roots     ${dbRoots.length}  (${dbRoots.filter((r) => r.type === 'hollow').length} hollow)`);
console.log(`patterns  ${dbPats.length}`);
console.log(`coined    ${coined.length} curated precedents`);
console.log(`lexicon   ${attested.size} forms`);
console.log(`slots     ${cells.length}  (${att} attested, ${cells.length - att} vacant)`);
console.log(`skipped   ${skipped} hollow-root cells whose patterns would mutate`);
console.log(`coverage  ${((att / cells.length) * 100).toFixed(1)}% — vacant means "not in this lexicon", not "not in Arabic"`);
db.close();
