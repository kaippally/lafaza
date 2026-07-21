import React, { useEffect, useState } from 'react';
import { get } from '../api.js';
import Form from '../Form.jsx';
import Speak from '../Speak.jsx';

export default function Precedents() {
  const [rows, setRows] = useState([]);
  useEffect(() => { get('/api/coined').then(setRows); }, []);

  return (
    <>
      <div className="note">
        <b>The precedent.</b> Each of these is a modern thing named by filling a slot the language
        had already licensed. The root supplied the sense, the pattern supplied the shape, and no
        borrowing was needed. Root letters are gold; everything the pattern added is blue.
      </div>

      <div className="cards">
        {rows.map((c) => (
          <div className="card wide" key={c.id}>
            <div className="top">
              <div className="wordline">
                <Form segments={c.segments} size="xl" />
                <Speak text={c.form} />
              </div>
              <div className="score ar">{c.pattern}</div>
            </div>
            <div className="predicted"><b>{c.en}</b></div>
            <div className="literal">literally “{c.literal}”</div>
            <div className="meta">
              <span className="ar">{c.root.split('').join(' ')}</span>
              <span>·</span>
              <em>{c.root_sense}</em>
            </div>
            {c.note && <div className="cnote">{c.note}</div>}
          </div>
        ))}
      </div>
    </>
  );
}
