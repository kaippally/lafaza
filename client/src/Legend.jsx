import React, { useState } from 'react';
import Form from './Form.jsx';

// مَكْتَبة — library. Radicals ك ت ب; the pattern مَفْعَلة supplies the مَ and the ة.
const EXAMPLE = [{ t: 'a', s: 'مَ' }, { t: 'r', s: 'كْتَب' }, { t: 'a', s: 'ة' }];

const SWATCHES = [
  ['gold', 'root letters',
    'The three consonants carrying the core meaning. ك ت ب is anything to do with writing. Every related word in Arabic is built from these three, always in this order.'],
  ['blue', 'pattern letters',
    'What the pattern wraps around the root. These can only ever come from the ten augments سَأَلْتُمونيها (س ء ل ت م و ن ي ه ا) — any other letter in a word belongs to the root. The pattern supplies the grammatical job: place, instrument, machine, doer.'],
  ['green', 'attested',
    'This form is in the loaded lexicon — it already exists in Arabic with a settled meaning. Green cells are the language as it currently stands.'],
  ['indigo', 'vacant',
    'Correctly formed and grammatically legal, but carrying no recorded meaning. The slot exists and is unclaimed — this is where a new invention gets named. Caveat: it means absent from THIS lexicon (~1,300 forms), not proven absent from Arabic.'],
  ['grey', 'not generated',
    'Deliberately skipped. This root has و or ي as its middle letter (a "hollow" root), which collapses in this pattern — قَوَلَ surfaces as قالَ. Rather than print a form that would be wrong, the cell is left empty.'],
];

export default function Legend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="legendbar">
      <div className="legrow">
        {SWATCHES.map(([c, label, tip]) => (
          <span className="legitem" key={c} data-tip={tip} tabIndex={0}>
            <i className={'sw ' + c} />{label}
          </span>
        ))}

        <span className="legex">
          <Form segments={EXAMPLE} size="md" />
          <span className="legexmini">= <span className="lg">ك ت ب</span> in <span className="ar">مَفْعَلة</span></span>
        </span>

        <button className="legtoggle" onClick={() => setOpen(!open)}>
          {open ? '▾ less' : '▸ what do these mean?'}
        </button>
      </div>

      {open && (
        <div className="legdetail">
          <ul>
            {SWATCHES.map(([c, label, tip]) => (
              <li key={c}><i className={'sw ' + c} /><b>{label}</b> — {tip}</li>
            ))}
          </ul>
          <p>
            <b>مَكْتَبة</b> “library” splits as root <span className="lg">ك ت ب</span> “write” inside
            the place-noun pattern <span className="ar">مَفْعَلة</span>, which supplies the
            <span className="lb"> مَ </span> and the <span className="lb">ة</span>. Vowel marks belong
            to the pattern too, but Arabic renders them as one glyph with the letter they sit on, so
            they take that letter’s colour.
          </p>
        </div>
      )}
    </div>
  );
}
