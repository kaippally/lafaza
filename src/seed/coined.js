// Landmark coinages: modern things named by filling a slot the language already licensed.
// `literal` is what the root/pattern combination says on its own terms — the sense that
// existed before the referent did.

export const coined = [
  { form: 'صاروخ', en: 'rocket', root: 'صرخ', rootSense: 'to scream, to cry out', pattern: 'فاعول',
    literal: 'the screamer', note: 'Classical Arabic used صاروخ of a loud, shrieking thing. The pattern فاعول (device / powerful agent) had the slot filled by sound long before anything left the ground.' },

  { form: 'قِطار', en: 'train', root: 'قطر', rootSense: 'to tow in a line', pattern: 'فِعال',
    literal: 'a roped line of beasts', note: 'قِطار meant a string of camels tied nose-to-tail. When rolling stock arrived it needed no new word — the coupling metaphor was already the root. قاطِرة (فاعِلة, "the one that tows") became the locomotive.' },

  { form: 'حاسوب', en: 'computer', root: 'حسب', rootSense: 'to count, to reckon', pattern: 'فاعول',
    literal: 'a device that reckons', note: 'Coined in the 1980s on the same فاعول pattern as صاروخ, deliberately displacing the borrowed كمبيوتر. The slot was empty and grammatically ready; the Academy only had to point it at the machine.' },

  { form: 'مَكْتَبة', en: 'library', root: 'كتب', rootSense: 'to write', pattern: 'مَفْعَلة',
    literal: 'the place of writing/books', note: 'مَفْعَلة is the plain place-noun pattern — the same one that gives مَدْرَسة (school) and مَزْرَعة (farm). Any root can take it, which is why Arabic never has to borrow a word for a building.' },

  { form: 'طَيّارة', en: 'airplane', root: 'طير', rootSense: 'to fly', pattern: 'فَعّالة',
    literal: 'a machine that flies', note: 'فَعّالة is the machine pattern. طَيّار — "habitual flyer" — was already a word; the feminine turns the agent into the device. Same derivation as غَسّالة (washer) and ثَلّاجة (fridge).' },

  { form: 'سَيّارة', en: 'automobile', root: 'سير', rootSense: 'to travel, to journey', pattern: 'فَعّالة',
    literal: 'a travelling thing', note: 'The strongest case: سَيّارة appears in the Qur\'an (Yusuf 12:10, 12:19) meaning a caravan of travellers — some thirteen centuries before the automobile claimed it.' },

  { form: 'هاتِف', en: 'telephone', root: 'هتف', rootSense: 'to call out', pattern: 'فاعِل',
    literal: 'the one who calls out', note: 'Classically a disembodied voice heard calling — precisely a voice with no body attached to it. The referent changed; the description did not.' },

  { form: 'مِذْياع', en: 'radio', root: 'ذيع', rootSense: 'to spread, to become widely known', pattern: 'مِفْعال',
    literal: 'an instrument for spreading abroad', note: 'مِفْعال is the instrument pattern that also gives مِفْتاح (key) and مِقْياس (gauge).' },

  { form: 'مِجْهَر', en: 'microscope', root: 'جهر', rootSense: 'to make visible, to declare openly', pattern: 'مِفْعَل',
    literal: 'a tool for making visible', note: 'The root already meant bringing the hidden into the open — the instrument pattern only had to be applied.' },

  { form: 'مِنْظار', en: 'telescope / endoscope', root: 'نظر', rootSense: 'to look', pattern: 'مِفْعال',
    literal: 'an instrument for looking', note: 'The same root gives نَظّارة (eyeglasses, machine pattern), مَنْظَر (view), نَظَرِيّة (theory) and نَظائِر (isotopes).' },

  { form: 'ثَلّاجة', en: 'refrigerator', root: 'ثلج', rootSense: 'snow, ice', pattern: 'فَعّالة',
    literal: 'a machine that makes ice', note: null },

  { form: 'غَسّالة', en: 'washing machine', root: 'غسل', rootSense: 'to wash', pattern: 'فَعّالة',
    literal: 'a machine that washes', note: null },

  { form: 'دَبّابة', en: 'tank', root: 'دبب', rootSense: 'to crawl, to move slowly', pattern: 'فَعّالة',
    literal: 'a machine that crawls', note: 'Named for gait, not armament — the root describes the tracks.' },

  { form: 'حافِلة', en: 'bus', root: 'حفل', rootSense: 'to gather, to be crowded', pattern: 'فاعِلة',
    literal: 'the crowded one', note: null },

  { form: 'شاحِنة', en: 'truck', root: 'شحن', rootSense: 'to load, to charge', pattern: 'فاعِلة',
    literal: 'the one that carries a load', note: 'The same root now also carries "charge" in the electrical sense — شاحِن is a phone charger.' },

  { form: 'مِصْعَد', en: 'elevator', root: 'صعد', rootSense: 'to ascend', pattern: 'مِفْعَل',
    literal: 'a tool for ascending', note: null },

  { form: 'بَرْقِيّة', en: 'telegram', root: 'برق', rootSense: 'lightning, to flash', pattern: 'فَعْلِيّة',
    literal: 'a lightning-thing', note: 'The abstract-noun suffix ـِيّة turned a flash of lightning into a message sent at its speed.' },

  { form: 'مُتَفاعِل', en: 'nuclear reactor', root: 'فعل', rootSense: 'to do, to act', pattern: 'مُتَفاعِل',
    literal: 'that in which mutual action occurs', note: 'Form VI is the reciprocal — the pattern itself supplies "reaction". The physics arrived to fit the grammar.' },

  { form: 'نَظائِر', en: 'isotopes', root: 'نظر', rootSense: 'to look', pattern: 'فَعائِل',
    literal: 'counterparts, things that match each other', note: null },

  { form: 'عَلَقة', en: 'one clinging thing; a leech', root: 'علق', rootSense: 'to cling, to hang on to', pattern: 'فَعَلة',
    literal: 'a single unit of that which clings', note: 'This is اسم الوحدة, the singulative — not an instance of an action but one unit carved out of a collective. عَلَق is a mass noun (clinging matter, leeches); the ة takes one out of the mass, exactly as شَجَر (trees) gives شَجَرة (one tree) and بَقَر gives بَقَرة. The same root yields عَلاقة (a relationship — what hangs between two parties), تَعْليق (suspension, and so also commentary), عَلّاقة (a hanger) and عَالِق (stuck). The Qur\'an uses عَلَق of human origin (96:2) and عَلَقة in the embryological sequence (22:5, 23:14), and the term is much discussed in that connection. What the morphology itself asserts is only "one of the things that cling" — the referent is supplied from outside the grammar.' },

  { form: 'اِكْتِتاب', en: 'share subscription (IPO)', root: 'كتب', rootSense: 'to write', pattern: 'اِفْتِعال',
    literal: 'writing oneself in', note: 'Form VIII is the self-directed reflexive — entering your own name in a register. Modern finance took the slot unchanged.' },
];
