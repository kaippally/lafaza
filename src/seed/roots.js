import { rootType } from '../morph.js';

// [letters, verb, gerund, noun-sense, field]
// Sound triliteral roots only — roots containing و ي ء mutate irregularly and would
// generate false forms from the templates. Geminate roots (r2 === r3) are included but
// get flagged and down-scored by morph.phonotactics().

export const roots = [
  // cognition
  ['علم', 'know', 'knowing', 'knowledge', 'cognition'],
  ['فهم', 'understand', 'understanding', 'comprehension', 'cognition'],
  ['ذكر', 'recall', 'recalling', 'memory', 'cognition'],
  ['حفظ', 'preserve', 'preserving', 'safekeeping', 'cognition'],
  ['درس', 'study', 'studying', 'a lesson', 'cognition'],
  ['بحث', 'search', 'searching', 'research', 'cognition'],
  ['فكر', 'think', 'thinking', 'thought', 'cognition'],
  ['عقل', 'reason', 'reasoning', 'intellect', 'cognition'],
  ['حكم', 'judge', 'judging', 'judgement', 'cognition'],
  ['حسب', 'compute', 'computing', 'a reckoning', 'cognition'],
  ['قدر', 'estimate', 'estimating', 'capacity', 'cognition'],
  ['خمن', 'guess', 'guessing', 'conjecture', 'cognition'],
  ['شرح', 'explain', 'explaining', 'an explanation', 'cognition'],
  ['فسر', 'interpret', 'interpreting', 'interpretation', 'cognition'],
  ['رمز', 'encode', 'encoding', 'a symbol', 'cognition'],
  ['حلم', 'dream', 'dreaming', 'a dream', 'cognition'],
  ['نسي', 'forget', 'forgetting', 'forgetting', 'cognition'],
  ['يقظ', 'be alert', 'alertness', 'wakefulness', 'cognition'],

  // perception
  ['نظر', 'look', 'looking', 'sight', 'perception'],
  ['بصر', 'see', 'seeing', 'vision', 'perception'],
  ['لحظ', 'glance', 'glancing', 'a glance', 'perception'],
  ['رصد', 'observe', 'observing', 'observation', 'perception'],
  ['شهد', 'witness', 'witnessing', 'testimony', 'perception'],
  ['كشف', 'uncover', 'uncovering', 'disclosure', 'perception'],
  ['فتش', 'inspect', 'inspecting', 'inspection', 'perception'],
  ['شعر', 'sense', 'sensing', 'feeling', 'perception'],
  ['لمس', 'touch', 'touching', 'a touch', 'perception'],
  ['شمم', 'smell', 'smelling', 'scent', 'perception'],
  ['ذوق', 'taste', 'tasting', 'taste', 'perception'],
  ['حدس', 'intuit', 'intuiting', 'intuition', 'perception'],

  // communication
  ['كتب', 'write', 'writing', 'a text', 'communication'],
  ['قرأ', 'read', 'reading', 'a reading', 'communication'],
  ['خبر', 'inform', 'informing', 'news', 'communication'],
  ['رسل', 'send', 'sending', 'a message', 'communication'],
  ['بلغ', 'convey', 'conveying', 'a communiqué', 'communication'],
  ['نطق', 'speak', 'speaking', 'speech', 'communication'],
  ['لفظ', 'utter', 'uttering', 'an utterance', 'communication'],
  ['همس', 'whisper', 'whispering', 'a whisper', 'communication'],
  ['صمت', 'fall silent', 'silence', 'silence', 'communication'],
  ['ترجم', 'translate', 'translating', 'translation', 'communication'],
  ['نشر', 'publish', 'publishing', 'publication', 'communication'],
  ['علن', 'announce', 'announcing', 'an announcement', 'communication'],
  ['سجل', 'record', 'recording', 'a record', 'communication'],
  ['شفر', 'encrypt', 'encrypting', 'a cipher', 'communication'],
  ['كلم', 'put into words', 'wording', 'a word', 'communication'],

  // sound
  ['صرخ', 'scream', 'screaming', 'a scream', 'sound'],
  ['هتف', 'call out', 'calling out', 'a call', 'sound'],
  ['زعق', 'shout', 'shouting', 'a shout', 'sound'],
  ['سمع', 'hear', 'hearing', 'hearing', 'sound'],
  ['نغم', 'intone', 'intoning', 'a melody', 'sound'],
  ['طرب', 'delight in music', 'musical rapture', 'rapture', 'sound'],
  ['صدح', 'sing out', 'singing out', 'a resonant call', 'sound'],
  ['رنن', 'ring', 'ringing', 'a ring', 'sound'],
  ['طنن', 'buzz', 'buzzing', 'a buzz', 'sound'],
  ['قرع', 'knock', 'knocking', 'a knock', 'sound'],

  // motion
  ['ركض', 'run', 'running', 'a run', 'motion'],
  ['زحف', 'crawl', 'crawling', 'a crawl', 'motion'],
  ['دفع', 'push', 'pushing', 'a thrust', 'motion'],
  ['سحب', 'drag', 'dragging', 'a pull', 'motion'],
  ['جذب', 'attract', 'attracting', 'attraction', 'motion'],
  ['رفع', 'raise', 'raising', 'a lift', 'motion'],
  ['خفض', 'lower', 'lowering', 'a lowering', 'motion'],
  ['نقل', 'transport', 'transporting', 'transport', 'motion'],
  ['حمل', 'carry', 'carrying', 'a load', 'motion'],
  ['قطر', 'tow in a line', 'towing', 'a train of things', 'motion'],
  ['عبر', 'cross', 'crossing', 'a crossing', 'motion'],
  ['سلك', 'thread through', 'threading', 'a wire or route', 'motion'],
  ['نفذ', 'penetrate', 'penetrating', 'penetration', 'motion'],
  ['زلق', 'slide', 'sliding', 'a slip', 'motion'],
  ['قفز', 'leap', 'leaping', 'a leap', 'motion'],
  ['درج', 'proceed by steps', 'gradation', 'a step', 'motion'],
  ['هبط', 'descend', 'descending', 'a descent', 'motion'],
  ['صعد', 'ascend', 'ascending', 'an ascent', 'motion'],
  ['دور', 'turn', 'turning', 'a rotation', 'motion'],

  // making
  ['صنع', 'manufacture', 'manufacturing', 'a manufacture', 'making'],
  ['عمل', 'work', 'working', 'work', 'making'],
  ['نجر', 'do carpentry', 'carpentry', 'joinery', 'making'],
  ['خبز', 'bake', 'baking', 'bread', 'making'],
  ['طبخ', 'cook', 'cooking', 'a dish', 'making'],
  ['نسج', 'weave', 'weaving', 'a textile', 'making'],
  ['زرع', 'plant', 'planting', 'a crop', 'making'],
  ['حصد', 'harvest', 'harvesting', 'a harvest', 'making'],
  ['طحن', 'grind', 'grinding', 'meal', 'making'],
  ['عجن', 'knead', 'kneading', 'dough', 'making'],
  ['سبك', 'cast in a mould', 'casting', 'a casting', 'making'],
  ['نحت', 'carve', 'carving', 'a sculpture', 'making'],
  ['رسم', 'draw', 'drawing', 'a drawing', 'making'],
  ['طبع', 'imprint', 'imprinting', 'a print', 'making'],
  ['نقش', 'engrave', 'engraving', 'an engraving', 'making'],
  ['صبغ', 'dye', 'dyeing', 'a dye', 'making'],
  ['لحم', 'weld', 'welding', 'a weld', 'making'],
  ['صهر', 'smelt', 'smelting', 'a smelt', 'making'],
  ['برم', 'twist together', 'twisting', 'a twist', 'making'],

  // force
  ['ضرب', 'strike', 'striking', 'a blow', 'force'],
  ['كسر', 'break', 'breaking', 'a fracture', 'force'],
  ['قطع', 'cut', 'cutting', 'a cut', 'force'],
  ['ثقب', 'pierce', 'piercing', 'a hole', 'force'],
  ['حفر', 'dig', 'digging', 'an excavation', 'force'],
  ['سحق', 'crush', 'crushing', 'a crushing', 'force'],
  ['ضغط', 'compress', 'compressing', 'pressure', 'force'],
  ['فجر', 'burst open', 'bursting', 'a burst', 'force'],
  ['قذف', 'hurl', 'hurling', 'a projectile', 'force'],
  ['شدد', 'tighten', 'tightening', 'tension', 'force'],
  ['طرق', 'hammer', 'hammering', 'a hammering', 'force'],
  ['برد', 'file down', 'filing', 'a filing', 'force'],
  ['فرم', 'mince', 'mincing', 'mince', 'force'],

  // light / energy
  ['برق', 'flash', 'flashing', 'a flash', 'light'],
  ['شعل', 'ignite', 'igniting', 'a flame', 'light'],
  ['حرق', 'burn', 'burning', 'a burn', 'light'],
  ['سخن', 'heat', 'heating', 'heat', 'light'],
  ['لمع', 'gleam', 'gleaming', 'a gleam', 'light'],
  ['شحن', 'charge', 'charging', 'a charge', 'light'],
  ['شرر', 'spark', 'sparking', 'a spark', 'light'],
  ['بهر', 'dazzle', 'dazzling', 'dazzle', 'light'],
  ['خفت', 'dim', 'dimming', 'dimness', 'light'],
  ['شفف', 'be translucent', 'translucence', 'transparency', 'light'],

  // water / flow
  ['سكب', 'pour', 'pouring', 'a pour', 'water'],
  ['رشح', 'seep through', 'filtering', 'a filtrate', 'water'],
  ['نزح', 'drain', 'draining', 'drainage', 'water'],
  ['غمر', 'flood', 'flooding', 'a flood', 'water'],
  ['نضح', 'sprinkle', 'sprinkling', 'a spray', 'water'],
  ['غسل', 'wash', 'washing', 'a wash', 'water'],
  ['نظف', 'clean', 'cleaning', 'cleanliness', 'water'],
  ['كنس', 'sweep', 'sweeping', 'a sweeping', 'water'],
  ['رطب', 'moisten', 'moistening', 'moisture', 'water'],
  ['جفف', 'dry', 'drying', 'dryness', 'water'],

  // containment
  ['خزن', 'store', 'storing', 'a store', 'containment'],
  ['حصن', 'fortify', 'fortifying', 'a fortification', 'containment'],
  ['ستر', 'veil', 'veiling', 'a screen', 'containment'],
  ['غلف', 'enclose', 'enclosing', 'a casing', 'containment'],
  ['حجب', 'screen off', 'screening', 'a barrier', 'containment'],
  ['قفل', 'lock', 'locking', 'a lock', 'containment'],
  ['ربط', 'bind', 'binding', 'a tie', 'containment'],
  ['شبك', 'interlink', 'interlinking', 'a network', 'containment'],
  ['حزم', 'bundle', 'bundling', 'a bundle', 'containment'],
  ['درع', 'armour', 'armouring', 'armour', 'containment'],
  ['حرس', 'guard', 'guarding', 'a guard', 'containment'],

  // measure / order
  ['رتب', 'arrange', 'arranging', 'an arrangement', 'measure'],
  ['نظم', 'order', 'ordering', 'a system', 'measure'],
  ['صنف', 'classify', 'classifying', 'a class', 'measure'],
  ['فرز', 'sort', 'sorting', 'a sorting', 'measure'],
  ['ضبط', 'calibrate', 'calibrating', 'calibration', 'measure'],
  ['عدد', 'enumerate', 'enumerating', 'a count', 'measure'],
  ['حدد', 'delimit', 'delimiting', 'a boundary', 'measure'],
  ['طبق', 'match layer to layer', 'matching', 'a layer', 'measure'],
  ['وثق', 'document', 'documenting', 'a document', 'measure'],

  // exchange
  ['تجر', 'trade', 'trading', 'commerce', 'exchange'],
  ['بدل', 'exchange', 'exchanging', 'a substitute', 'exchange'],
  ['شرك', 'share in', 'sharing', 'a partnership', 'exchange'],
  ['خدم', 'serve', 'serving', 'a service', 'exchange'],
  ['نصح', 'advise', 'advising', 'advice', 'exchange'],
  ['صلح', 'reconcile', 'reconciling', 'reconciliation', 'exchange'],
  ['طلب', 'request', 'requesting', 'a request', 'exchange'],
  ['نفع', 'benefit', 'benefiting', 'a benefit', 'exchange'],
  ['أجر', 'hire out', 'hiring', 'a fee', 'exchange'],
  ['رهن', 'pledge', 'pledging', 'a pledge', 'exchange'],

  // growth / body
  ['نبت', 'sprout', 'sprouting', 'a shoot', 'growth'],
  ['لقح', 'inoculate', 'inoculating', 'an inoculation', 'growth'],
  ['طعم', 'graft, feed', 'grafting', 'a graft', 'growth'],
  ['هضم', 'digest', 'digesting', 'digestion', 'growth'],
  ['نفس', 'breathe', 'breathing', 'a breath', 'body'],
  ['نبض', 'pulse', 'pulsing', 'a pulse', 'body'],
  ['رقد', 'lie down', 'reclining', 'rest', 'body'],
  ['صحح', 'make sound', 'restoring health', 'health', 'body'],
  ['شفق', 'feel tenderness', 'tenderness', 'compassion', 'body'],
  ['جرح', 'wound', 'wounding', 'a wound', 'body'],

  // time / domestic
  ['سرع', 'be fast', 'speeding', 'speed', 'time'],
  ['بطأ', 'be slow', 'slowing', 'slowness', 'time'],
  ['أجل', 'defer', 'deferring', 'a term', 'time'],
  ['سكن', 'dwell', 'dwelling', 'a dwelling', 'domestic'],
  ['فرش', 'spread out bedding', 'furnishing', 'furnishing', 'domestic'],
  ['طوي', 'fold', 'folding', 'a fold', 'domestic'],
  ['علق', 'cling', 'clinging', 'a clinging thing', 'body'],
  ['رصف', 'pave', 'paving', 'paving', 'domestic'],

  // Hollow roots (و/ي as 2nd radical). Generated ONLY against gemination-protected
  // patterns — see HOLLOW_SAFE in patterns.js. This is what lets طَيّارة and سَيّارة exist.
  ['طير', 'fly', 'flying', 'flight', 'motion'],
  ['سير', 'travel', 'travelling', 'a journey', 'motion'],
  ['دور', 'revolve', 'revolving', 'a rotation', 'motion'],
  ['جول', 'roam', 'roaming', 'a circuit', 'motion'],
  ['موج', 'surge', 'surging', 'a wave', 'water'],
  ['صوت', 'sound', 'sounding', 'a sound', 'sound'],
  ['نور', 'illuminate', 'illuminating', 'light', 'light'],
  ['لون', 'colour', 'colouring', 'a colour', 'light'],
  ['حول', 'transform', 'transforming', 'a transformation', 'making'],
  ['قود', 'lead, drive', 'driving', 'command', 'motion'],
  ['زود', 'supply', 'supplying', 'provision', 'exchange'],
  ['صور', 'depict', 'depicting', 'an image', 'making'],
  ['صوغ', 'formulate, shape', 'formulating', 'a formulation', 'making'],
  ['بخر', 'vaporise', 'vaporising', 'vapour', 'water'],
  ['غوص', 'dive', 'diving', 'a dive', 'water'],
  ['ثور', 'erupt', 'erupting', 'an upheaval', 'force'],
  ['نوم', 'sleep', 'sleeping', 'sleep', 'body'],
  ['ذوب', 'dissolve', 'dissolving', 'a solution', 'water'],
  ['طوع', 'obey, be pliant', 'yielding', 'compliance', 'body'],
]
  .map(([letters, en, ger, noun, field]) => ({
    letters,
    r1: letters[0], r2: letters[1], r3: letters[2],
    en, ger, noun, field,
  }))
  .map((r) => ({ ...r, type: rootType([r.r1, r.r2, r.r3]) }))
  .filter((r, i, all) => all.findIndex((o) => o.letters === r.letters) === i)
  .filter((r) => {
    // hollow roots survive — they generate against gemination-protected patterns only.
    const ok = r.type === 'sound' || r.type === 'geminate' || r.type === 'hollow';
    if (!ok) console.warn(`skipping ${r.type} root ${r.letters} — templates would emit false forms`);
    return ok;
  });
