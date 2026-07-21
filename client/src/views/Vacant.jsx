import React, { useEffect, useState } from 'react';
import { get } from '../api.js';
import Form, { augmentsOf } from '../Form.jsx';
import Speak from '../Speak.jsx';

export default function Vacant({ stats }) {
  const [rows, setRows] = useState([]);
  const [field, setField] = useState('');
  const [category, setCategory] = useState('');
  const [minScore, setMinScore] = useState(40);

  useEffect(() => {
    get('/api/vacant', { field, category, minScore, limit: 300 }).then(setRows);
  }, [field, category, minScore]);

  return (
    <>
      <div className="note">
        <b>How to read this.</b> Each entry is a form Arabic morphology permits but that this
        lexicon has no record of. The gloss is projected mechanically from the root’s meaning and
        the pattern’s function — it is what the word <em>would</em> mean if something arrived
        needing that name. “Vacant” means absent from the loaded lexicon, not absent from Arabic.
        Hover a tile to see which letters the pattern added.
      </div>

      <div className="bar">
        <label>Field</label>
        <select value={field} onChange={(e) => setField(e.target.value)}>
          <option value="">all</option>
          {stats?.fields.map((f) => <option key={f.field} value={f.field}>{f.field} ({f.n})</option>)}
        </select>

        <label>Pattern type</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">all</option>
          {stats?.categories.map((c) => <option key={c.category} value={c.category}>{c.category} ({c.n})</option>)}
        </select>

        <label>Min score {minScore}</label>
        <input type="range" min="0" max="100" value={minScore} style={{ minWidth: 160 }}
               onChange={(e) => setMinScore(Number(e.target.value))} />

        <span style={{ color: 'var(--dim)', fontSize: 13 }}>{rows.length} shown</span>
      </div>

      <div className="cards">
        {rows.map((r) => {
          const flags = JSON.parse(r.flags || '[]');
          return (
            <div className="card reveal" key={r.form + r.root}>
              <div className="top">
                <div className="wordline">
                  <Form segments={r.segments} size="lg" />
                  <Speak text={r.form} />
                </div>
                <div className="score">{r.score}</div>
              </div>
              <div className="predicted">{r.predicted}</div>
              <div className="meta">
                <span className="ar">{r.root.split('').join(' ')}</span>
                <span>·</span>
                <em>{r.root_en}</em>
                <span>·</span>
                <span className="ar">{r.pattern}</span>
                <span>·</span>
                <span>{r.fn}</span>
                <span>·</span>
                <span>{r.field}</span>
              </div>
              <div className="added">pattern adds <b className="ar">{augmentsOf(r.segments) || '—'}</b></div>
              {flags.length > 0 && <div className="flags">{flags.join(' · ')}</div>}
            </div>
          );
        })}
      </div>
    </>
  );
}
