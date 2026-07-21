import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { get } from '../api.js';
import Form, { augmentsOf } from '../Form.jsx';
import { speak } from '../Speak.jsx';

const strip = (s) => s.replace(/[ً-ْٰـ\s]/g, '');

const SORTS = {
  alpha: ['A–Z by root', (a, b) => a.letters.localeCompare(b.letters, 'ar')],
  field: ['grouped by field', (a, b) => a.field.localeCompare(b.field) || a.letters.localeCompare(b.letters, 'ar')],
  sense: ['A–Z by English sense', (a, b) => a.en.localeCompare(b.en)],
};

// ~3,600 cells. Everything here exists to keep that cheap:
//  - no per-cell handlers; one delegated listener on <tbody> reads data-k off the target
//  - the table JSX is memoised, so hovering never reconciles the grid
//  - the "speaking" flash is applied by classList, not state, so it never re-renders
export default function Matrix({ stats }) {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('alpha');
  const [hover, setHover] = useState(null);
  const lookup = useRef(new Map());

  useEffect(() => { get('/api/matrix', { category }).then(setData); }, [category]);

  useEffect(() => {
    if (!data) return;
    lookup.current = new Map();
    for (const s of data.slots) lookup.current.set(s.root_id + ':' + s.pattern_id, s);
    for (const r of data.roots) lookup.current.set('r' + r.id, r);
    for (const p of data.patterns) lookup.current.set('p' + p.id, p);
  }, [data]);

  const onOver = useCallback((e) => {
    const td = e.target.closest('td[data-k]');
    if (!td) return;
    const slot = lookup.current.get(td.dataset.k);
    if (!slot) return;
    setHover({
      slot,
      root: lookup.current.get('r' + slot.root_id),
      pattern: lookup.current.get('p' + slot.pattern_id),
      x: e.clientX, y: e.clientY,
    });
  }, []);

  const onClick = useCallback(async (e) => {
    const td = e.target.closest('td[data-k]');
    if (!td) return;
    const slot = lookup.current.get(td.dataset.k);
    if (!slot) return;
    td.classList.add('saying');
    const r = await speak(slot.form);
    setTimeout(() => td.classList.remove('saying'), r === 'ok' ? 700 : 1200);
  }, []);

  const roots = useMemo(() => {
    if (!data) return [];
    const f = filter.trim().toLowerCase();
    const fa = strip(filter.trim());
    const out = f
      ? data.roots.filter((r) =>
          r.en.toLowerCase().includes(f) ||
          r.field.toLowerCase().includes(f) ||
          (fa && strip(r.letters).includes(fa)))
      : data.roots.slice();
    return out.sort(SORTS[sort][1]);
  }, [data, filter, sort]);

  const table = useMemo(() => {
    if (!data) return null;
    const index = new Map(data.slots.map((s) => [s.root_id + ':' + s.pattern_id, s]));
    return (
      <table className="mtx">
        <thead>
          <tr>
            <th className="cNum">#</th>
            <th className="cRoot">Root</th>
            <th className="cSense">Sense</th>
            {data.patterns.map((p) => (
              <th key={p.id} className="pcol">
                <div className="ar pname">{p.name}</div>
                <div className="pfn">{p.fn}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody onMouseOver={onOver} onClick={onClick}>
          {roots.map((r, i) => (
            <tr key={r.id}>
              <td className="cNum">{i + 1}</td>
              <td className="cRoot ar rootcell">{r.letters.split('').join(' ')}</td>
              <td className="cSense">{r.en}<i className="fieldtag">{r.field}</i></td>
              {data.patterns.map((p) => {
                const k = r.id + ':' + p.id;
                const s = index.get(k);
                if (!s) return <td key={p.id} className="cell na" title="not generated — this pattern mutates for a hollow root">·</td>;
                return (
                  <td key={p.id} data-k={k} className={'cell ' + (s.attested ? 'att' : 'vac')}>
                    <Form segments={s.segments} />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }, [data, roots, onOver, onClick]);

  if (!data) return null;

  return (
    <>
      <div className="bar">
        <label>Patterns</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">top 20 by productivity</option>
          <option value="all">all {stats?.patterns} patterns</option>
          {stats?.categories.map((c) => <option key={c.category} value={c.category}>{c.category} ({c.n})</option>)}
        </select>

        <label>Find root</label>
        <input value={filter} placeholder="ك ت ب  or  write  or  making"
               onChange={(e) => setFilter(e.target.value)} style={{ minWidth: 210 }} />
        {filter && <button className="chip clear" onClick={() => setFilter('')}>clear</button>}

        <label>Sort</label>
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          {Object.entries(SORTS).map(([k, [label]]) => <option key={k} value={k}>{label}</option>)}
        </select>

        <span style={{ color: 'var(--dim)', fontSize: 13 }}>
          {roots.length} of {data.roots.length} roots · {data.patterns.length} patterns · click a cell to hear it
        </span>
      </div>

      <div className="scroll mtxwrap" onMouseLeave={() => setHover(null)}>{table}</div>

      {hover && (
        <div className="tip" style={{ left: Math.min(hover.x + 16, window.innerWidth - 340), top: Math.min(hover.y + 16, window.innerHeight - 210) }}>
          <Form segments={hover.slot.segments} size="lg" />
          <div className={'tipstat ' + (hover.slot.attested ? 'a' : 'v')}>
            {hover.slot.attested ? 'attested' : `vacant · score ${hover.slot.score}`}
          </div>
          <div className="tipmean">{hover.slot.predicted}</div>
          <div className="tiprow"><span>root</span> <b className="ar">{hover.root?.letters.split('').join(' ')}</b> — {hover.root?.en}</div>
          <div className="tiprow"><span>pattern</span> <b className="ar">{hover.pattern?.name}</b> — {hover.pattern?.fn}</div>
          <div className="tiprow"><span>added</span> <b className="ar">{augmentsOf(hover.slot.segments) || '—'}</b></div>
          <div className="tiprow tiphint">click to hear it</div>
        </div>
      )}
    </>
  );
}
