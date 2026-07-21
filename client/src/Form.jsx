import React from 'react';

// Renders a generated word with its three radicals separated from the سألتمونيها augments.
// `segments` is [{t:'r'|'a', s:'...'}] — 'r' is root, 'a' is everything the pattern added.
// Sizes come from classes, not inline styles, so the font-size slider (--ar-scale) reaches them.
export default function Form({ segments, size = '', className = '' }) {
  let parsed = segments;
  if (typeof segments === 'string') {
    try { parsed = JSON.parse(segments); } catch { parsed = null; }
  }
  if (!Array.isArray(parsed)) return <span className={'ar ' + className}>{String(segments ?? '')}</span>;

  return (
    <span className={['ar form', size, className].filter(Boolean).join(' ')}>
      {parsed.map((seg, i) => (
        <span key={i} className={seg.t === 'r' ? 'rad' : 'aug'}>{seg.s}</span>
      ))}
    </span>
  );
}

export const augmentsOf = (segments) => {
  let parsed = segments;
  if (typeof segments === 'string') {
    try { parsed = JSON.parse(segments); } catch { return ''; }
  }
  if (!Array.isArray(parsed)) return '';
  return parsed.filter((s) => s.t === 'a').map((s) => s.s).join(' ');
};
