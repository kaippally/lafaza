const HARAKAT = /[ً-ْٰـ]/g;
const IS_HARAKAH = /[ً-ْٰـ]/;

export const bare = (s) => s.replace(HARAKAT, '').replace(/ٱ/g, 'ا');

export function apply(template, [r1, r2, r3]) {
  return template.replace(/1/g, r1).replace(/2/g, r2).replace(/3/g, r3);
}

const WEAK = 'وي';
const HAMZA = 'ءأإآئؤ';

export function rootType([r1, r2, r3]) {
  if ([r1, r2, r3].some((c) => HAMZA.includes(c))) return 'hamzated';
  if (WEAK.includes(r1)) return 'assimilated';
  if (WEAK.includes(r3) || r3 === 'ى') return 'defective';
  if (WEAK.includes(r2)) return 'hollow';
  if (r2 === r3) return 'geminate';
  return 'sound';
}

// Split a generated form into radical vs augment runs so the UI can colour the
// سألتمونيها letters separately. Diacritics attach to the letter they sit on —
// they render as one glyph cluster and cannot be coloured apart from it.
export function segment(template, radicals) {
  const out = [];
  for (const ch of template) {
    if (ch === '1' || ch === '2' || ch === '3') {
      out.push({ t: 'r', s: radicals[Number(ch) - 1] });
    } else if (IS_HARAKAH.test(ch)) {
      if (out.length) out[out.length - 1].s += ch;
      else out.push({ t: 'a', s: ch });
    } else {
      out.push({ t: 'a', s: ch });
    }
  }
  return merge(out);
}

// Same split for a word we did NOT generate (the curated coinages): walk the form and
// consume the radicals left to right; everything else is an augment.
export function segmentByRoot(form, root) {
  const radicals = [...root];
  const out = [];
  let i = 0;
  for (const ch of form) {
    if (IS_HARAKAH.test(ch)) {
      if (out.length) out[out.length - 1].s += ch;
      continue;
    }
    if (i < radicals.length && ch === radicals[i]) { out.push({ t: 'r', s: ch }); i++; }
    else out.push({ t: 'a', s: ch });
  }
  return merge(out);
}

// merge adjacent runs of the same kind so the client renders fewer spans
function merge(segs) {
  return segs.reduce((acc, seg) => {
    const last = acc[acc.length - 1];
    if (last && last.t === seg.t) last.s += seg.s;
    else acc.push({ ...seg });
    return acc;
  }, []);
}

const SUN_ASSIM = 'صضطظدذزثتسشلن';
const EMPHATIC = 'صضطظق';

// Form VIII infixes a ت after the first radical; it assimilates when r1 is one of these.
export const formVIIIIrregular = (r1) => SUN_ASSIM.includes(r1) && r1 !== 'ن';

export function phonotactics(root, pattern) {
  const [r1, r2, r3] = root;
  const flags = [];
  let factor = 1;

  if (r2 === r3) { flags.push('geminate root (مضاعف) — surface form contracts'); factor *= 0.7; }
  if (r1 === r2) { flags.push('identical first two radicals — very rare shape'); factor *= 0.5; }
  if (pattern.form === 'VIII' && formVIIIIrregular(r1)) {
    flags.push('Form VIII ت assimilates after ' + r1);
    factor *= 0.85;
  }
  if (pattern.form === 'VII' && r1 === 'ن') { flags.push('نـ prefix collides with ن radical'); factor *= 0.4; }
  if (pattern.template.includes('م') && r1 === 'م') { flags.push('م prefix collides with م radical'); factor *= 0.7; }
  if (pattern.template.includes('ت') && r1 === 'ت') { flags.push('ت prefix collides with ت radical'); factor *= 0.7; }
  if ([r1, r2, r3].filter((c) => EMPHATIC.includes(c)).length === 3) {
    flags.push('three emphatic radicals — heavy to pronounce');
    factor *= 0.8;
  }
  return { factor, flags };
}

const PAST = {
  know: 'known', understand: 'understood', think: 'thought', see: 'seen', write: 'written',
  send: 'sent', speak: 'spoken', hear: 'heard', ring: 'rung', run: 'run', draw: 'drawn',
  strike: 'struck', break: 'broken', cut: 'cut', dig: 'dug', burst: 'burst', grind: 'ground',
  weave: 'woven', sweep: 'swept', bind: 'bound', lie: 'lain', be: 'been', hang: 'hung',
  spread: 'spread', cast: 'cast', fall: 'fallen', sing: 'sung', hold: 'held', leap: 'leapt',
};
const THIRD = { be: 'is', have: 'has', do: 'does', go: 'goes' };

// Phrasal senses like "seep through" or "proceed by steps" inflect only their head verb,
// and only its alphabetic part — so "formulate, shape" becomes "formulates, shape", not
// "formulate,s shape".
const head = (phrase, fn) => {
  const [first, ...rest] = phrase.split(' ');
  const m = first.match(/^([A-Za-z]+)(.*)$/);
  return [m ? fn(m[1]) + m[2] : fn(first), ...rest].join(' ');
};

const third = (v) => head(v, (w) => {
  if (THIRD[w]) return THIRD[w];
  if (/(s|sh|ch|x|z|o)$/.test(w)) return w + 'es';
  if (/[^aeiou]y$/.test(w)) return w.slice(0, -1) + 'ies';
  return w + 's';
});

const past = (v) => head(v, (w) => {
  if (PAST[w]) return PAST[w];
  if (/e$/.test(w)) return w + 'd';
  if (/[^aeiou]y$/.test(w)) return w.slice(0, -1) + 'ied';
  return w + 'ed';
});

// Fill a pattern's semantic frame from a root's English senses.
export function gloss(frame, root) {
  return frame
    .replace(/\{V3\}/g, third(root.en))
    .replace(/\{VD\}/g, past(root.en))
    .replace(/\{V\}/g, root.en)
    .replace(/\{G\}/g, root.ger)
    .replace(/\{N\}/g, root.noun || root.ger);
}
