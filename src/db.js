import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const DB_PATH = join(here, '..', 'data', 'sarf.db');

export function open() {
  mkdirSync(dirname(DB_PATH), { recursive: true });
  const db = new DatabaseSync(DB_PATH);
  db.exec('PRAGMA journal_mode = WAL');
  return db;
}

export const SCHEMA = `
CREATE TABLE IF NOT EXISTS roots (
  id INTEGER PRIMARY KEY,
  letters TEXT UNIQUE NOT NULL,
  r1 TEXT NOT NULL, r2 TEXT NOT NULL, r3 TEXT NOT NULL,
  en TEXT NOT NULL,
  ger TEXT NOT NULL,
  noun TEXT,
  field TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'sound'
);

CREATE TABLE IF NOT EXISTS coined (
  id INTEGER PRIMARY KEY,
  form TEXT NOT NULL,
  en TEXT NOT NULL,
  root TEXT NOT NULL,
  root_sense TEXT NOT NULL,
  pattern TEXT NOT NULL,
  literal TEXT NOT NULL,
  note TEXT,
  segments TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS patterns (
  id INTEGER PRIMARY KEY,
  -- not unique: one shape can carry two functions (فَعَلة is both a broken plural and the
  -- singulative اسم الوحدة). The fn column is what distinguishes them.
  name TEXT NOT NULL,
  template TEXT NOT NULL,
  category TEXT NOT NULL,
  form TEXT,
  fn TEXT NOT NULL,
  frame TEXT NOT NULL,
  productivity REAL NOT NULL,
  affinity TEXT NOT NULL,
  hollow_safe INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS lexicon (
  form_bare TEXT PRIMARY KEY,
  gloss TEXT,
  source TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS slots (
  id INTEGER PRIMARY KEY,
  root_id INTEGER NOT NULL REFERENCES roots(id),
  pattern_id INTEGER NOT NULL REFERENCES patterns(id),
  form TEXT NOT NULL,
  form_bare TEXT NOT NULL,
  attested INTEGER NOT NULL,
  attested_gloss TEXT,
  predicted TEXT NOT NULL,
  score REAL NOT NULL,
  flags TEXT NOT NULL,
  segments TEXT NOT NULL,
  UNIQUE (root_id, pattern_id)
);

CREATE INDEX IF NOT EXISTS slots_score ON slots(attested, score DESC);
CREATE INDEX IF NOT EXISTS slots_bare ON slots(form_bare);
`;
