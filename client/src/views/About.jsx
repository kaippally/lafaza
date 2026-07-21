import React, { useEffect, useState } from 'react';
import { get } from '../api.js';
import Form from '../Form.jsx';
import Speak from '../Speak.jsx';

// لَفّاظة itself — root ل ف ظ inside the machine pattern فَعّالة. Copied verbatim from what
// the generator emits for that slot, so the About page shows the app's own output.
const NAME = [{ t: 'r', s: 'لَفّ' }, { t: 'a', s: 'ا' }, { t: 'r', s: 'ظ' }, { t: 'a', s: 'ة' }];

export default function About() {
  const [stats, setStats] = useState(null);
  useEffect(() => { get('/api/stats').then(setStats).catch(() => {}); }, []);

  return (
    <div className="about">
      <section className="aboutname">
        <div className="wordline">
          <Form segments={NAME} size="xl" />
          <Speak text="لَفّاظة" />
        </div>
        <p>
          <b>لَفّاظة</b> <i>laffāẓa</i> — “a machine that utters”. The root <span className="lg">ل ف ظ</span>{' '}
          “to utter” inside the machine pattern <span className="ar">فَعّالة</span>, the same
          derivation that gives غَسّالة (washing machine) and طَيّارة (aircraft).
        </p>
        <p>
          The name was taken from the app’s own output. It was a vacant cell in this matrix —
          grammatically legal, correctly formed, and meaning nothing at all — until the project
          needed naming. That is the entire argument in one word.
        </p>
        <p className="aside">
          It is also a joke on the discipline. <b>لَفْظ</b> is the classical term for a word as
          <em> pure form</em>, set against <b>مَعْنى</b>, its meaning. This program manufactures
          لفظ without معنى: well-formed shells waiting for referents.
        </p>
      </section>

      <section>
        <h2>What it does</h2>
        <p>
          Arabic builds nearly every word by pouring a three-consonant root into a fixed pattern.
          The root carries the meaning, the pattern carries the grammatical job — place, instrument,
          machine, doer — and the letters a pattern may add come only from the ten augments of{' '}
          <span className="ar">سَأَلْتُمونيها</span>.
        </p>
        <p>
          Because the system is generative, the <em>shape</em> of a word can exist long before
          anything needs that name. صاروخ meant “screamer” before it meant <b>rocket</b>. قِطار was
          a roped line of camels before it was a <b>train</b>. سَيَّارة appears in the Qur’an
          meaning a caravan of travellers, some thirteen centuries before the automobile claimed it.
        </p>
        <p>
          Lafaza crosses every root against every pattern, separates the cells that already carry a
          meaning from those that do not, projects what each empty cell <em>would</em> mean, and
          ranks how ready it is to be coined into.
        </p>
        {stats && (
          <div className="aboutstats">
            <span><b>{stats.roots}</b> roots</span>
            <span><b>{stats.patterns}</b> patterns</span>
            <span><b>{stats.slots.toLocaleString()}</b> slots</span>
            <span><b>{stats.vacant.toLocaleString()}</b> still waiting</span>
          </div>
        )}
      </section>

      <section className="devcard">
        <h2>The developer</h2>
        <div className="devrow">
          <div className="devtext">
            <h3>Nishad Kaippally</h3>
            <p>
              Not an Arabic scholar — which is rather the point. This began as a spreadsheet
              wondering how far the root-and-pattern system could be pushed, and became a tool for
              finding the words Arabic has already licensed but never spent.
            </p>
            <ul className="links">
              <li><a href="https://www.youtube.com/@KaippsCafe" target="_blank" rel="noreferrer">youtube.com/@KaippsCafe</a></li>
              <li><a href="https://github.com/kaippally/lafaza" target="_blank" rel="noreferrer">github.com/kaippally/lafaza</a></li>
              <li><a href="mailto:kaippsCafe@gmail.com">kaippsCafe@gmail.com</a></li>
            </ul>
          </div>

          <a className="cafe" href="https://www.youtube.com/@KaippsCafe" target="_blank" rel="noreferrer">
            <img src="/kaippscafe.svg" alt="Kaipps Cafe" width="132" height="132" />
            <span className="cafename">Kaipps Cafe</span>
            <span className="cafesub">YouTube</span>
          </a>
        </div>
      </section>

      <section>
        <h2>Honesty about the data</h2>
        <p>
          “Vacant” means <b>absent from the lexicon this app loaded</b> — a hand-checked core of
          roughly 1,300 forms — not absent from Arabic. A full dictionary would reclaim many cells
          currently shown as empty. Import a larger wordlist and the claim tightens.
        </p>
        <p>
          The projected meanings are mechanical: root sense crossed with pattern function. They
          describe what a word would be <em>licensed</em> to mean, not what any speaker has ever
          meant by it. And the coinability score ranks plausibility, never correctness.
        </p>
        <p>
          Several patterns in this app were missing or mislabelled until somebody went looking for
          one specific word. Corrections are welcome and expected.
        </p>
      </section>

      <footer className="aboutfoot">
        MIT licensed · © 2026 Nishad Kaippally ·{' '}
        <a href="https://github.com/kaippally/lafaza" target="_blank" rel="noreferrer">source</a>
      </footer>
    </div>
  );
}
