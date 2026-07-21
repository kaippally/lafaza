// template: 1/2/3 = the three radicals. frame: {V}=verb, {G}=gerund, {N}=noun sense.
// productivity: how readily Arabic academies coin NEW words on this pattern (0-1).
// affinity: semantic fields the pattern naturally takes.

const ALL = ['cognition','perception','communication','motion','making','force','light','sound','water','containment','measure','exchange','growth','body','time','domestic'];
const PHYSICAL = ['motion','making','force','light','water','containment','measure','domestic','body'];
// Machines and instruments are not only for physical work: حاسوب (compute) and مِذْياع
// (broadcast) are the canonical modern coinages, so cognition/communication/perception count.
const DEVICE = PHYSICAL.concat(['communication','cognition','perception']);

export const patterns = [
  // ---- Form I ----
  { name: 'فَعَلَ', template: '1َ2َ3َ', category: 'Verb', form: 'I', fn: 'base verb', frame: 'to {V}', productivity: 0.2, affinity: ALL },
  { name: 'فاعِل', template: '1ا2ِ3', category: 'Participle', form: 'I', fn: 'active participle', frame: 'one who {V3}; the {G} one', productivity: 0.7, affinity: ALL },
  { name: 'مَفْعول', template: 'مَ1ْ2و3', category: 'Participle', form: 'I', fn: 'passive participle', frame: 'that which is {VD}', productivity: 0.6, affinity: ALL },

  // ---- Form II ----
  { name: 'فَعَّلَ', template: '1َ2َّ3َ', category: 'Verb', form: 'II', fn: 'causative / intensive', frame: 'to make {V}; to {V} intensively', productivity: 0.5, affinity: ALL },
  { name: 'تَفْعيل', template: 'تَ1ْ2ي3', category: 'Verbal noun', form: 'II', fn: 'verbal noun of II', frame: 'the act of causing {G}', productivity: 0.85, affinity: ALL },
  { name: 'مُفَعِّل', template: 'مُ1َ2ِّ3', category: 'Participle', form: 'II', fn: 'agent of II', frame: 'one that brings about {G}', productivity: 0.8, affinity: ALL },
  { name: 'مُفَعَّل', template: 'مُ1َ2َّ3', category: 'Participle', form: 'II', fn: 'patient of II', frame: 'having been made to {V}', productivity: 0.55, affinity: ALL },

  // ---- Form III ----
  { name: 'فاعَلَ', template: '1ا2َ3َ', category: 'Verb', form: 'III', fn: 'do with/toward another', frame: 'to {V} with another', productivity: 0.35, affinity: ALL },
  { name: 'مُفاعَلة', template: 'مُ1ا2َ3ة', category: 'Verbal noun', form: 'III', fn: 'verbal noun of III', frame: 'mutual {G} between parties', productivity: 0.6, affinity: ['communication','exchange','cognition','force','measure'] },
  { name: 'مُفاعِل', template: 'مُ1ا2ِ3', category: 'Participle', form: 'III', fn: 'agent of III', frame: 'one who {V3} alongside another', productivity: 0.55, affinity: ['communication','exchange','cognition','force'] },

  // ---- Form IV ----
  { name: 'أَفْعَلَ', template: 'أَ1ْ2َ3َ', category: 'Verb', form: 'IV', fn: 'causative', frame: 'to cause to {V}', productivity: 0.35, affinity: ALL },
  { name: 'إفْعال', template: 'إ1ْ2ا3', category: 'Verbal noun', form: 'IV', fn: 'verbal noun of IV', frame: 'the act of making {G} happen', productivity: 0.75, affinity: ALL },
  { name: 'مُفْعِل', template: 'مُ1ْ2ِ3', category: 'Participle', form: 'IV', fn: 'agent of IV', frame: 'one that induces {G}', productivity: 0.6, affinity: ALL },

  // ---- Form V ----
  { name: 'تَفَعَّلَ', template: 'تَ1َ2َّ3َ', category: 'Verb', form: 'V', fn: 'reflexive of II', frame: 'to {V} oneself; to gradually {V}', productivity: 0.4, affinity: ALL },
  { name: 'تَفَعُّل', template: 'تَ1َ2ُّ3', category: 'Verbal noun', form: 'V', fn: 'verbal noun of V', frame: 'the process of becoming {VD}', productivity: 0.7, affinity: ALL },
  { name: 'مُتَفَعِّل', template: 'مُتَ1َ2ِّ3', category: 'Participle', form: 'V', fn: 'agent of V', frame: 'one undergoing {G}', productivity: 0.6, affinity: ALL },

  // ---- Form VI ----
  { name: 'تَفاعَلَ', template: 'تَ1ا2َ3َ', category: 'Verb', form: 'VI', fn: 'mutual / reciprocal', frame: 'to {V} one another', productivity: 0.4, affinity: ALL },
  { name: 'تَفاعُل', template: 'تَ1ا2ُ3', category: 'Verbal noun', form: 'VI', fn: 'verbal noun of VI', frame: 'reciprocal {G}; interaction of {G}', productivity: 0.7, affinity: ALL },
  { name: 'مُتَفاعِل', template: 'مُتَ1ا2ِ3', category: 'Participle', form: 'VI', fn: 'agent of VI', frame: 'a reactor — that in which mutual {G} occurs', productivity: 0.65, affinity: PHYSICAL },

  // ---- Form VII ----
  { name: 'اِنْفَعَلَ', template: 'اِنْ1َ2َ3َ', category: 'Verb', form: 'VII', fn: 'passive / mediopassive', frame: 'to undergo {G}', productivity: 0.35, affinity: PHYSICAL },
  { name: 'اِنْفِعال', template: 'اِنْ1ِ2ا3', category: 'Verbal noun', form: 'VII', fn: 'verbal noun of VII', frame: 'the state of having been {VD}', productivity: 0.55, affinity: ALL },
  { name: 'مُنْفَعِل', template: 'مُنْ1َ2ِ3', category: 'Participle', form: 'VII', fn: 'agent of VII', frame: 'that which is undergoing {G}', productivity: 0.4, affinity: PHYSICAL },

  // ---- Form VIII ----
  { name: 'اِفْتَعَلَ', template: 'اِ1ْتَ2َ3َ', category: 'Verb', form: 'VIII', fn: 'reflexive / middle', frame: 'to {V} for oneself; to take on {G}', productivity: 0.45, affinity: ALL },
  { name: 'اِفْتِعال', template: 'اِ1ْتِ2ا3', category: 'Verbal noun', form: 'VIII', fn: 'verbal noun of VIII', frame: 'self-directed {G}', productivity: 0.7, affinity: ALL },
  { name: 'مُفْتَعِل', template: 'مُ1ْتَ2ِ3', category: 'Participle', form: 'VIII', fn: 'agent of VIII', frame: 'one who takes up {G}', productivity: 0.6, affinity: ALL },

  // ---- Form X ----
  { name: 'اِسْتَفْعَلَ', template: 'اِسْتَ1ْ2َ3َ', category: 'Verb', form: 'X', fn: 'seek / request / deem', frame: 'to seek {G}', productivity: 0.45, affinity: ALL },
  { name: 'اِسْتِفْعال', template: 'اِسْتِ1ْ2ا3', category: 'Verbal noun', form: 'X', fn: 'verbal noun of X', frame: 'the act of seeking or drawing on {G}', productivity: 0.7, affinity: ALL },
  { name: 'مُسْتَفْعِل', template: 'مُسْتَ1ْ2ِ3', category: 'Participle', form: 'X', fn: 'agent of X', frame: 'one who seeks or consumes {G}', productivity: 0.65, affinity: ALL },
  { name: 'مُسْتَفْعَل', template: 'مُسْتَ1ْ2َ3', category: 'Participle', form: 'X', fn: 'patient of X', frame: 'a facility where {G} is sought', productivity: 0.5, affinity: PHYSICAL },

  // ---- Instruments & machines: where inventions land ----
  { name: 'فَعّالة', template: '1َ2ّا3ة', category: 'Machine', form: null, fn: 'اسم آلة — machine', frame: 'a machine that {V3}', productivity: 1.0, affinity: DEVICE },
  { name: 'مِفْعال', template: 'مِ1ْ2ا3', category: 'Instrument', form: null, fn: 'اسم آلة — instrument', frame: 'an instrument for {G}', productivity: 0.95, affinity: DEVICE.concat(['measure']) },
  { name: 'مِفْعَل', template: 'مِ1ْ2َ3', category: 'Instrument', form: null, fn: 'اسم آلة — tool', frame: 'a tool for {G}', productivity: 0.9, affinity: DEVICE },
  { name: 'مِفْعَلة', template: 'مِ1ْ2َ3ة', category: 'Instrument', form: null, fn: 'اسم آلة — implement', frame: 'an implement for {G}', productivity: 0.85, affinity: DEVICE.concat(['domestic']) },
  { name: 'فاعول', template: '1ا2و3', category: 'Device', form: null, fn: 'device / powerful agent', frame: 'a device that {V3}', productivity: 0.8, affinity: DEVICE },
  { name: 'فَعّال', template: '1َ2ّا3', category: 'Trade', form: null, fn: 'habitual doer; occupation', frame: 'a professional who {V3}', productivity: 0.6, affinity: ALL },

  // ---- Place & time ----
  { name: 'مَفْعَل', template: 'مَ1ْ2َ3', category: 'Place', form: null, fn: 'اسم مكان وزمان', frame: 'the place or time of {G}', productivity: 0.8, affinity: ALL },
  { name: 'مَفْعَلة', template: 'مَ1ْ2َ3ة', category: 'Place', form: null, fn: 'اسم مكان (f.)', frame: 'an establishment for {G}', productivity: 0.8, affinity: ALL },
  { name: 'مَفْعِل', template: 'مَ1ْ2ِ3', category: 'Place', form: null, fn: 'اسم مكان (variant)', frame: 'the site of {G}', productivity: 0.5, affinity: ALL },

  // ---- Abstract & qualitative ----
  { name: 'فِعالة', template: '1ِ2ا3ة', category: 'Craft', form: null, fn: 'craft / industry', frame: 'the craft or industry of {G}', productivity: 0.75, affinity: ALL },
  // Same consonants as فِعالة, distinguished only by the first vowel, and a different job:
  // abstract qualities. عَلاقة (relationship) vs عِلاقة (a strap). سَلامة، شَجاعة، نَظافة، فَصاحة.
  { name: 'فَعالة', template: '1َ2ا3ة', category: 'Quality', form: null, fn: 'مصدر — abstract quality or state', frame: 'the quality or state of {G}', productivity: 0.7, affinity: ALL },
  { name: 'فَعْل', template: '1َ2ْ3', category: 'Verbal noun', form: 'I', fn: 'basic action noun', frame: 'the act of {G}', productivity: 0.3, affinity: ALL },
  { name: 'فِعْل', template: '1ِ2ْ3', category: 'Verbal noun', form: 'I', fn: 'action-noun variant', frame: '{G} as a domain', productivity: 0.3, affinity: ALL },
  { name: 'فُعول', template: '1ُ2و3', category: 'Verbal noun', form: 'I', fn: 'motion noun / plural', frame: 'the movement of {G}', productivity: 0.3, affinity: ALL },
  { name: 'فَعيل', template: '1َ2ي3', category: 'Adjective', form: null, fn: 'صفة مشبهة', frame: 'permanently characterised by {G}', productivity: 0.5, affinity: ALL },
  { name: 'فَعْلان', template: '1َ2ْ3ان', category: 'Adjective', form: null, fn: 'temporary state', frame: 'temporarily in a state of {G}', productivity: 0.4, affinity: ['body','cognition','perception','growth'] },
  { name: 'أَفْعَل', template: 'أَ1ْ2َ3', category: 'Comparative', form: null, fn: 'اسم تفضيل', frame: 'more {G} than', productivity: 0.4, affinity: ALL },
  { name: 'فُعَيْل', template: '1ُ2َيْ3', category: 'Diminutive', form: null, fn: 'تصغير', frame: 'a miniature {N}', productivity: 0.6, affinity: PHYSICAL },
  { name: 'فَعْلة', template: '1َ2ْ3ة', category: 'Instance', form: null, fn: 'اسم مرة', frame: 'a single act of {G}', productivity: 0.5, affinity: ALL },
  // Same shape as the فَعَلة broken plural below, but a different job: اسم الوحدة carves ONE
  // unit out of a collective — شَجَر (trees) -> شَجَرة (one tree), عَلَق -> عَلَقة. Productive
  // for naming discrete units of a mass, which is why it keeps earning modern referents.
  { name: 'فَعَلة', template: '1َ2َ3ة', category: 'Singulative', form: null, fn: 'اسم الوحدة — one unit of a collective', frame: 'a single unit of {N}', productivity: 0.65, affinity: ALL },
  { name: 'فِعْلة', template: '1ِ2ْ3ة', category: 'Manner', form: null, fn: 'اسم هيئة', frame: 'the manner or mode of {G}', productivity: 0.5, affinity: ALL },
  { name: 'فَعْلِيّ', template: '1َ2ْ3ِيّ', category: 'Relative', form: null, fn: 'نسبة', frame: 'pertaining to {N}', productivity: 0.85, affinity: ALL },
  { name: 'فَعْلِيّة', template: '1َ2ْ3ِيّة', category: 'Abstract', form: null, fn: 'مصدر صناعي', frame: 'the doctrine, quality or -ism of {N}', productivity: 0.9, affinity: ALL },

  // ---- Plurals ----
  { name: 'أَفْعال', template: 'أَ1ْ2ا3', category: 'Plural', form: null, fn: 'broken plural', frame: 'plural — instances of {N}', productivity: 0.4, affinity: ALL },
  { name: 'فُعُل', template: '1ُ2ُ3', category: 'Plural', form: null, fn: 'broken plural', frame: 'plural of {N}', productivity: 0.3, affinity: ALL },
  { name: 'أَفْعِلة', template: 'أَ1ْ2ِ3ة', category: 'Plural', form: null, fn: 'broken plural', frame: 'plural — a set of {N}', productivity: 0.4, affinity: ALL },
  { name: 'فُعَلاء', template: '1ُ2َ3اء', category: 'Plural', form: null, fn: 'broken plural (human)', frame: 'plural — people who {V}', productivity: 0.4, affinity: ALL },
  { name: 'فُعّال', template: '1ُ2ّا3', category: 'Plural', form: null, fn: 'broken plural of فاعِل', frame: 'plural — those who {V}', productivity: 0.4, affinity: ALL },
  { name: 'فَعَلة', template: '1َ2َ3ة', category: 'Plural', form: null, fn: 'broken plural (trades)', frame: 'plural — practitioners of {G}', productivity: 0.4, affinity: ALL },
  { name: 'فَواعِل', template: '1َوا2ِ3', category: 'Plural', form: null, fn: 'broken plural', frame: 'plural — things that {V3}', productivity: 0.4, affinity: ALL },
  { name: 'مَفاعِل', template: 'مَ1ا2ِ3', category: 'Plural', form: null, fn: 'plural of مَفْعَل', frame: 'plural — places of {G}', productivity: 0.5, affinity: ALL },
  { name: 'مَفاعيل', template: 'مَ1ا2ي3', category: 'Plural', form: null, fn: 'plural of مِفْعال', frame: 'plural — instruments for {G}', productivity: 0.5, affinity: PHYSICAL },
  { name: 'فَعائِل', template: '1َ2ائِ3', category: 'Plural', form: null, fn: 'plural of فَعيلة', frame: 'plural — {G} entities', productivity: 0.4, affinity: ALL },
];

// Hollow roots (و/ي as 2nd radical) normally collapse — قَوَلَ surfaces as قالَ. But when the
// pattern geminates the middle radical it is protected and stays a hard consonant, so plain
// substitution is still correct: ط-ي-ر + فَعّالة -> طَيّارة. Only these patterns are safe;
// every other pattern is skipped for hollow roots rather than emitting a false form.
const HOLLOW_SAFE = new Set([
  'فَعَّلَ', 'تَفْعيل', 'مُفَعِّل', 'مُفَعَّل',
  'تَفَعَّلَ', 'تَفَعُّل', 'مُتَفَعِّل',
  'فَعّال', 'فَعّالة', 'فُعّال',
]);
for (const p of patterns) p.hollowSafe = HOLLOW_SAFE.has(p.name);
