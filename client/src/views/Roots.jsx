import React, { useEffect, useState } from 'react';
import { get } from '../api.js';
import Form from '../Form.jsx';
import Speak from '../Speak.jsx';

export default function Roots() {
  const [roots, setRoots] = useState([]);
  const [sel, setSel] = useState(null);

  useEffect(() => { get('/api/roots').then(setRoots); }, []);

  if (sel) {
    return (
      <>
        <div className="bar">
          <button onClick={() => setSel(null)} style={{ background: 'none', border: '1px solid var(--line)', color: 'var(--ink)', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>
            ← all roots
          </button>
          <span className="ar" style={{ fontSize: 26, color: 'var(--gold)' }}>{sel.root.letters.split('').join(' ')}</span>
          <span style={{ color: 'var(--dim)' }}>to {sel.root.en} · {sel.root.field}</span>
        </div>
        <div className="scroll">
          <table>
            <thead>
              <tr><th>Pattern</th><th>Function</th><th>Form</th><th /><th>Status</th><th>Meaning</th><th>Score</th></tr>
            </thead>
            <tbody>
              {sel.slots.map((s) => (
                <tr key={s.id}>
                  <td className="ar" style={{ fontSize: 16 }}>{s.pattern}</td>
                  <td style={{ color: 'var(--dim)' }}>{s.fn}</td>
                  <td><Form segments={s.segments} size="md" /></td>
                  <td><Speak text={s.form} /></td>
                  <td style={{ color: s.attested ? 'var(--live)' : 'var(--vacant)' }}>
                    {s.attested ? 'attested' : 'vacant'}
                  </td>
                  <td style={{ color: s.attested ? 'var(--dim)' : 'var(--ink)' }}>{s.predicted}</td>
                  <td style={{ color: 'var(--dim)' }}>{s.attested ? '' : s.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return (
    <div className="rootlist">
      {roots.map((r) => (
        <button key={r.id} onClick={() => get('/api/root/' + r.id).then(setSel)}>
          <div className="r ar">{r.letters.split('').join(' ')}</div>
          <div className="g">{r.en}</div>
          <div className="g">{r.attested}/{r.total} filled</div>
        </button>
      ))}
    </div>
  );
}
