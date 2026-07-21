import React, { useEffect, useState } from 'react';
import { get } from '../api.js';
import Form from '../Form.jsx';
import Speak from '../Speak.jsx';

const EXAMPLES = ['machine that', 'instrument for', 'place of', 'light', 'a device', 'measure'];

export default function Search() {
  const [q, setQ] = useState('');
  const [ctx, setCtx] = useState('');
  const [status, setStatus] = useState('');
  const [rows, setRows] = useState([]);

  // debounced — the context query scans every generated slot
  useEffect(() => {
    if (q.trim().length < 2 && ctx.trim().length < 2) { setRows([]); return; }
    const t = setTimeout(() => { get('/api/search', { q, ctx, status }).then(setRows); }, 200);
    return () => clearTimeout(t);
  }, [q, ctx, status]);

  return (
    <>
      <div className="bar">
        <label>Form</label>
        <input className="ar" value={q} placeholder="اكتب كلمة عربية"
               onChange={(e) => setQ(e.target.value)} />

        <label>Meaning</label>
        <input value={ctx} placeholder="e.g. machine that cuts"
               onChange={(e) => setCtx(e.target.value)} style={{ minWidth: 240 }} />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">any status</option>
          <option value="vacant">vacant only</option>
          <option value="attested">attested only</option>
        </select>

        <span style={{ color: 'var(--dim)', fontSize: 13 }}>{rows.length} shown</span>
      </div>

      <div className="bar exbar">
        <span style={{ color: 'var(--dim)', fontSize: 12 }}>try</span>
        {EXAMPLES.map((e) => (
          <button key={e} className="chip" onClick={() => setCtx(e)}>{e}</button>
        ))}
        {(q || ctx) && <button className="chip clear" onClick={() => { setQ(''); setCtx(''); }}>clear</button>}
      </div>

      {rows.length === 0 ? (
        <div className="note">
          Search the Arabic <b>form</b> (diacritics ignored), or the <b>meaning</b> — which matches
          the projected gloss, the root’s English sense, the pattern’s function and the semantic
          field. Combine both to narrow. Try “machine that” with <b>vacant only</b> to see what the
          language could name but has not.
        </div>
      ) : (
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Form</th><th /><th>Root</th><th>Pattern</th><th>Field</th><th>Status</th><th>Meaning</th><th>Score</th></tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td><Form segments={r.segments} size="md" /></td>
                  <td><Speak text={r.form} /></td>
                  <td className="ar">{r.root.split('').join(' ')} <span style={{ color: 'var(--dim)' }}>{r.root_en}</span></td>
                  <td className="ar">{r.pattern} <span style={{ color: 'var(--dim)' }}>{r.fn}</span></td>
                  <td style={{ color: 'var(--dim)' }}>{r.field}</td>
                  <td style={{ color: r.attested ? 'var(--live)' : 'var(--vacant)' }}>{r.attested ? 'attested' : 'vacant'}</td>
                  <td>{r.predicted}</td>
                  <td style={{ color: 'var(--dim)' }}>{r.attested ? '' : r.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
