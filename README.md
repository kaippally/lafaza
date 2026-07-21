# لَفّاظة · Lafaza — the waiting words

![license](https://img.shields.io/badge/license-MIT-blue) ![node](https://img.shields.io/badge/node-%E2%89%A522.5-brightgreen)

Crosses every Arabic triliteral root against every morphological pattern and separates the
cells that already carry a meaning from the cells that are **grammatically legal but have no
assigned referent**. Those empty cells are the thesis: صاروخ (“screamer”) was a legal word before
it meant *rocket*; قِطار (a roped line of camels) before it meant *train*; سَيَّارة appears in the
Qur'an meaning *caravan* centuries before the automobile. The slot pre-exists the invention.

For each vacant slot the app projects what the word *would* mean, from the root's semantics
crossed with the pattern's function, and scores how coinable it is.

### The name

**لَفّاظة** (*laffāẓa*) is one of the app's own vacant slots: root **ل-ف-ظ** “to utter” in the
machine pattern **فَعّالة** — the same derivation as غَسّالة (washing machine) and طَيّارة
(aircraft). It means *a machine that utters*, and it was an empty cell in this very matrix until
the project needed a name.

It is also a small joke on the discipline. **لَفْظ** is the classical term for a word as *pure
form*, set against **مَعْنى**, its meaning. This program manufactures لفظ without معنى —
well-formed shells waiting for referents.

## Run

Requires **Node 22.5+** (uses the built-in `node:sqlite`, so there is no native module to rebuild).

```
git clone https://github.com/kaippally/lafaza.git
cd lafaza
npm run setup     # installs server + client deps, builds the database
npm run dev       # api on :4030, client on :5190
```

Then open <http://localhost:5190>. No configuration is required — pronunciation, data and all
10,000+ generated slots work out of the box. Copy `.env.example` to `.env` only if you want to
change ports or plug in a Google Cloud TTS key.

If your shell defaults to an older Node: `fnm use 22` first, or prefix with
`fnm exec --using=22 --`.

## How a word is generated

Patterns are stored as templates with `1` `2` `3` standing for the three radicals — `مَ1ْ2َ3`
is مَفْعَل. Substitution uses non-Arabic placeholders on purpose: writing templates as `مفعل` and
substituting ف→ع, ع→ل cascades, because the ع you just inserted gets rewritten by the next rule.
That cascade is what corrupts most hand-built morphology spreadsheets.

## Reading a word's structure

Every form is stored split into radicals vs. augments, so the UI colours them apart:
**gold = the root**, **blue = everything the pattern added**. Those additions can only ever be
drawn from the ten letters of **سَأَلْتُمونيها** (س ء ل ت م و ن ي ه ا) — anything else in a word
is root. Vowel marks are pattern too, but they render as one glyph cluster with the letter they
sit on and so take that letter's colour.

Hover any Matrix cell for its projected English meaning, root, pattern, and the letters added.
**Click a cell to hear it.**

The grid is ~3,600 cells, so it is built to stay cheap to scroll: no per-cell event handlers —
one delegated listener on `<tbody>` reads `data-k` off the target — the table JSX is memoised on
its data so hovering never reconciles the grid, and the click flash is applied via `classList`
rather than React state so it triggers no render at all.

The header row and the Root/Sense columns are frozen. That needs the matrix to own its own
scroll box in both axes (`position: sticky` resolves against the nearest *scrolling* ancestor, so
page-level scrolling would leave the header nothing to stick to) and `border-collapse: separate`,
or Chrome drops the borders on sticky cells.

The slider in the top bar scales every Arabic glyph in the app — one `--ar-scale` custom property
that all word sizes are expressed against, persisted to `localStorage`. Sizes therefore come from
classes (`.form.sm/.md/.lg/.xl`), never inline styles, or the slider could not reach them.

## Pronunciation

The speaker button calls `/api/tts`, which caches mp3s to `data/tts/`. Three tiers, in order:

1. **Google Cloud TTS** (Wavenet, best quality) — used when `GOOGLE_TTS_KEY` is set:
   ```
   $env:GOOGLE_TTS_KEY = "..."     # optional: GOOGLE_TTS_VOICE, default ar-XA-Wavenet-B
   ```
2. **Google Translate's tts endpoint** — the default. No key, no signup. Undocumented but
   long-stable; Google rate-limits it and could change it without notice, so set a Cloud key
   if you care about it not breaking.
3. **Browser `speechSynthesis`** — last resort, and only works if a Windows Arabic language pack
   is installed. On a machine with no Arabic voice this produces silence, which is why it is not
   the primary path.

If all three fail the button turns red and logs both failure reasons to the console rather than
failing silently.

## Weak roots

Roots with و or ي as the **middle** radical (hollow: ط-ي-ر, س-ي-ر) collapse in most patterns —
قَوَلَ surfaces as قالَ. But when a pattern **geminates** the middle radical it is protected and
stays a hard consonant, so plain substitution stays correct: ط-ي-ر + فَعّالة → طَيّارة. Those ten
patterns are whitelisted (`HOLLOW_SAFE` in `seed/patterns.js`); every other pattern is **skipped**
for a hollow root rather than emitting a false form, and shows as `·` in the Matrix.

Defective (weak 3rd radical), assimilated (weak 1st) and hamzated roots are excluded entirely.

## Scoring

```
score = pattern.productivity     how readily Arabic coins NEW words on this pattern
      × field affinity           does a "machine" pattern suit this root's semantic field?
      × root liveness            roots already carrying many derivatives are live roots
      × phonotactics             penalties for geminate roots, prefix/radical collisions
```

`فَعّالة` (machine) and `مِفْعال` (instrument) carry the highest productivity — they are where
Arabic academies actually put new technology.

## The honest caveat

**"Vacant" means absent from the loaded lexicon, not absent from Arabic.** The seeded lexicon is
a hand-checked core of ~1,300 forms — roughly 28% of generated slots match it. A real dictionary
would reclaim many "vacant" cells. Import a wordlist to tighten the claim:

```
npm run import-wordlist -- path/to/wordlist.txt
npm run build-db
```

One Arabic word per line or whitespace-separated; diacritics are stripped on the way in.

Weak roots (containing و ي ء) are **excluded at seed time** — they mutate irregularly and the
templates would emit false forms. Only sound triliteral roots are generated.

## Layout

```
src/morph.js            template application, diacritic stripping, phonotactics, English inflection
src/seed/patterns.js    62 patterns: template, function, semantic frame, productivity, affinity
src/seed/roots.js       184 roots (sound + hollow) with English sense + semantic field
src/seed/lexicon.js     hand-checked attested forms (the attestation oracle)
src/seed/coined.js      21 curated precedents — rocket, train, computer, library, airplane…
src/build.js            generates root × pattern, checks attestation, scores
src/index.js            read-only JSON API on :4030
client/                 React + Vite on :5190
```

## API

| route | |
|---|---|
| `/api/stats` | counts, semantic fields, pattern categories |
| `/api/vacant?field=&category=&minScore=&limit=` | the waiting words, best first |
| `/api/coined` | the curated precedents, with segmentation |
| `/api/tts?text=` | Arabic pronunciation as mp3, cached to disk |
| `/api/matrix?category=` | root × pattern grid; `category=all` for every pattern |
| `/api/roots`, `/api/root/:id` | every generated form of one root |
| `/api/search?q=&ctx=&status=` | `q` = Arabic form (diacritics ignored); `ctx` = free-text meaning, matched against the projected gloss, the root's English senses, the pattern function and the semantic field |

## Contributing

The most useful contributions are **data**, not code:

- **Roots** (`src/seed/roots.js`) — `[letters, verb, gerund, noun-sense, field]`. Sound and hollow
  roots only; defective/assimilated/hamzated are filtered out at seed time. Keep the verb gloss a
  bare infinitive (`cut`, not `to cut`) — it gets inflected automatically.
- **Patterns** (`src/seed/patterns.js`) — template with `1`/`2`/`3` placeholders, a semantic frame
  using `{V}` `{V3}` `{VD}` `{G}` `{N}`, a productivity weight and a field-affinity list. Two
  patterns may share a template if their *function* differs (فَعَلة is both a broken plural and
  the singulative اسم الوحدة).
- **Lexicon** (`src/seed/lexicon.js`) — the attestation oracle, and the weakest part of the
  project. Every form added here reclaims a falsely "vacant" cell. Undiacriticized, one per line.
- **Precedents** (`src/seed/coined.js`) — modern words that filled a pre-existing slot.

After editing any seed file, run `npm run build-db`.

Corrections to the linguistic data are especially welcome — several patterns were missing or
mislabelled until someone went looking for a specific word.

## Author

**Nishad Kaippally** — <kaippsCafe@gmail.com>

## License

[MIT](LICENSE) © 2026 Nishad Kaippally

Arabic morphological analysis in `src/seed/` is assembled from the classical صرف tradition;
errors in it are mine, not the tradition's.
