import { readFileSync } from 'node:fs';
import { open } from './db.js';
import { bare } from './morph.js';

const file = process.argv[2];
if (!file) {
  console.error('usage: npm run import-wordlist -- <path-to-wordlist>');
  console.error('one Arabic word per line, or whitespace separated. Diacritics are stripped.');
  process.exit(1);
}

const db = open();
const words = readFileSync(file, 'utf8')
  .split(/[\s,;]+/)
  .map((w) => bare(w.trim()))
  .filter((w) => /^[ء-ي]{2,}$/.test(w));

const ins = db.prepare('INSERT OR IGNORE INTO lexicon (form_bare, gloss, source) VALUES (?, NULL, ?)');
const before = db.prepare('SELECT COUNT(*) n FROM lexicon').get().n;
db.exec('BEGIN');
for (const w of words) ins.run(w, 'import:' + file);
db.exec('COMMIT');
const after = db.prepare('SELECT COUNT(*) n FROM lexicon').get().n;

console.log(`read ${words.length} words, lexicon ${before} -> ${after}`);
console.log('now re-run: npm run build-db');
db.close();
