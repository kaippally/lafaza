import React, { useEffect, useState } from 'react';
import { get } from './api.js';
import Vacant from './views/Vacant.jsx';
import Matrix from './views/Matrix.jsx';
import Roots from './views/Roots.jsx';
import Search from './views/Search.jsx';
import Precedents from './views/Precedents.jsx';
import About from './views/About.jsx';
import Legend from './Legend.jsx';

const TABS = [
  ['vacant', 'Waiting words'],
  ['precedents', 'Precedents'],
  ['matrix', 'Matrix'],
  ['roots', 'Roots'],
  ['search', 'Search'],
  ['about', 'About'],
];

const STATS = [
  ['roots', 'roots'], ['patterns', 'patterns'], ['slots', 'slots'],
  ['attested', 'attested'], ['vacant', 'vacant'], ['lexicon', 'lexicon'],
];

const FACTORS = [
  ['Pattern productivity', 'How readily Arabic coins NEW words on this pattern. فَعّالة (machine) and مِفْعال (instrument) rank highest — that is where technology actually lands. Plural and verb patterns rank low.'],
  ['Field affinity', 'Does the pattern suit the root’s semantic field? “A machine that burns” takes the machine pattern naturally; “a machine that regrets” does not, and is cut to 55%.'],
  ['Root liveness', 'Roots already carrying many attested derivatives are living roots still in use. An empty slot on a live root is worth more than one on a root nobody derives from.'],
  ['Phonotactics', 'Penalties for shapes that are awkward to say: geminate roots, a prefix colliding with an identical radical, three emphatic consonants in a row.'],
];

function ScoreInfo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="scoreinfo">
      <button className={'scorebtn ' + (open ? 'on' : '')} onClick={() => setOpen(!open)}>
        what is the score?
      </button>
      {open && (
        <div className="scorepop">
          <h3>Coinability — 0 to 100</h3>
          <p className="scorelead">
            How good a candidate a <b>vacant</b> slot is for being coined into a real word. Four
            factors, multiplied. Attested cells are not scored.
          </p>
          <ul>
            {FACTORS.map(([k, v]) => (
              <li key={k}><b>{k}</b><span>{v}</span></li>
            ))}
          </ul>
          <p className="scorefoot">
            <b>100</b> = a highly productive pattern, on a well-matched semantic field, on a live
            root, with nothing awkward to pronounce. Sort by it to find the slots most ready to be
            filled — it ranks <em>plausibility</em>, not correctness.
          </p>
        </div>
      )}
    </div>
  );
}

// Scales every Arabic glyph in the app via one custom property.
function FontSize() {
  const [v, setV] = useState(() => Number(localStorage.getItem('arScale')) || 1);
  useEffect(() => {
    document.documentElement.style.setProperty('--ar-scale', String(v));
    localStorage.setItem('arScale', String(v));
  }, [v]);

  return (
    <div className="fontsize" title="Arabic display size">
      <span className="ar fsmall">أ</span>
      <input type="range" min="0.7" max="2.2" step="0.05" value={v}
             onChange={(e) => setV(Number(e.target.value))} />
      <span className="ar fbig">أ</span>
      <b>{Math.round(v * 100)}%</b>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('vacant');
  const [stats, setStats] = useState(null);

  useEffect(() => { get('/api/stats').then(setStats).catch(() => setStats('err')); }, []);

  if (stats === 'err') {
    return (
      <main>
        <div className="note">
          <b>API not reachable on :4030.</b> Run <code>npm run build-db</code> then <code>npm run server</code>.
        </div>
      </main>
    );
  }

  return (
    <>
      <header>
        <div className="hrow">
          <div className="brand">
            <h1><span className="ar brandar">لَفّاظة</span> Lafaza <span>— the waiting words</span></h1>
            <p>
              Every Arabic triliteral root crossed with every morphological pattern. Cells that
              already carry a meaning are the language as it stands; cells that are grammatically
              legal but carry no referent are slots waiting for something to be invented — the way
              <span className="ar"> سَيَّارة </span> sat unclaimed as “caravan” until the automobile.
              The name is one of them: <span className="ar">لَفّاظة</span>, “a machine that utters”,
              was itself an empty slot until this app needed naming.
            </p>
          </div>

          <div className="hright">
            {stats && (
              <div className="stats">
                {STATS.map(([k, label]) => (
                  <div className="stat" key={k}>
                    <b>{stats[k].toLocaleString()}</b>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            )}
            <ScoreInfo />
          </div>
        </div>

        <div className="navrow">
          <nav>
            {TABS.map(([k, label]) => (
              <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>
            ))}
          </nav>
          <FontSize />
        </div>
      </header>

      <main>
        {tab !== 'about' && <Legend />}
        {tab === 'vacant' && <Vacant stats={stats} />}
        {tab === 'precedents' && <Precedents />}
        {tab === 'matrix' && <Matrix stats={stats} />}
        {tab === 'roots' && <Roots />}
        {tab === 'search' && <Search />}
        {tab === 'about' && <About />}
      </main>
    </>
  );
}
