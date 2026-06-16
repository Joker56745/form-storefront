/** Hardcoded catalog — maps 1:1 to Liquid product/collection objects in production. */
window.FORM = {
  brand: {
    name: 'FORM',
    tagline:
      'Clinical-grade vitamins. Transparent formulas. Daily rituals that fit real life.',
  },
  announcement: 'Subscribe & save 15% on your first ritual',
  products: [
    {
      id: 'magnesium-glycinate',
      type: 'Sleep & recovery',
      title: 'Magnesium Glycinate',
      price: 32,
      subscribePrice: 27,
      description:
        'Highly absorbable chelated magnesium for evening calm, muscle recovery, and deeper sleep — without the digestive upset of oxide forms.',
      longDescription:
        'Magnesium glycinate binds elemental magnesium to glycine — an amino acid that supports calm without sedation. FORM uses fully reacted bisglycinate, not buffered oxide blends masked as "glycinate."',
      serving: '2 capsules · 30 min before bed',
      format: '60 capsules · 1-month supply',
      testing: 'Third-party tested · NSF certified facility',
      image: 'images/magnesium-glycinate.png',
      imageAlt:
        'FORM Magnesium Glycinate — clear bottle with beige capsules on sage background',
      highlights: [
        '200 mg elemental magnesium per serving',
        'Gentle on digestion — no oxide fillers',
        'Pairs with evening wind-down rituals',
      ],
      ingredients: [
        { name: 'Magnesium (as bisglycinate)', amount: '200 mg', dv: '48%' },
        { name: 'Glycine', amount: '800 mg', dv: '†' },
      ],
      howToUse:
        'Take 2 capsules 30 minutes before sleep, with or without food. Start with 1 capsule for 3 nights if new to magnesium supplementation.',
      stackWith: ['d3-k2', 'omega-3'],
    },
    {
      id: 'd3-k2',
      type: 'Immunity',
      title: 'Vitamin D3 + K2',
      price: 28,
      subscribePrice: 24,
      description:
        'Synergistic D3 (5000 IU) with K2 (MK-7) to support calcium routing, immune function, and year-round levels when sun exposure is limited.',
      longDescription:
        'Vitamin D3 raises serum 25(OH)D. K2 (MK-7) helps direct calcium to bone matrix rather than soft tissue — a pairing clinicians recommend but few brands dose correctly.',
      serving: '1 softgel daily with a meal',
      format: '90 softgels · 3-month supply',
      testing: 'Third-party tested for potency & purity',
      image: 'images/d3-k2.png',
      imageAlt: 'Vitamin D3 + K2 — white bottle with capsules on cream background',
      highlights: [
        '5,000 IU D3 + 100 mcg K2 (MK-7)',
        'Taken with dietary fat for absorption',
        '3-month supply per bottle',
      ],
      ingredients: [
        { name: 'Vitamin D3 (cholecalciferol)', amount: '125 mcg (5,000 IU)', dv: '625%' },
        { name: 'Vitamin K2 (MK-7)', amount: '100 mcg', dv: '83%' },
      ],
      howToUse:
        'Take 1 softgel daily with your largest meal containing fat. Retest 25(OH)D levels every 3–6 months with your clinician.',
      stackWith: ['magnesium-glycinate', 'daily-multi'],
    },
    {
      id: 'omega-3',
      type: 'Cognition',
      title: 'Omega-3 EPA/DHA',
      price: 38,
      subscribePrice: 32,
      description:
        'Triglyceride-form fish oil with 1,200 mg combined EPA/DHA per serving. Molecularly distilled, burp-free enteric coating.',
      longDescription:
        'FORM uses re-esterified triglyceride (rTG) fish oil — the form closest to whole-food omega-3s. Enteric coating minimizes reflux; IFOS 5-star certification confirms low oxidation and heavy metals.',
      serving: '2 softgels daily with food',
      format: '60 softgels · 1-month supply',
      testing: 'IFOS 5-star · heavy metals screened',
      image: 'images/omega-3.png',
      imageAlt: 'Omega-3 EPA/DHA — golden softgels with white bottle',
      highlights: [
        '720 mg EPA + 480 mg DHA per serving',
        'Triglyceride form — not ethyl ester',
        'Wild-caught anchovy & sardine',
      ],
      ingredients: [
        { name: 'EPA (eicosapentaenoic acid)', amount: '720 mg', dv: '†' },
        { name: 'DHA (docosahexaenoic acid)', amount: '480 mg', dv: '†' },
        { name: 'Total omega-3', amount: '1,200 mg', dv: '†' },
      ],
      howToUse:
        'Take 2 softgels with breakfast or lunch. Refrigerate after opening. Safe to combine with Daily Multi.',
      stackWith: ['daily-multi', 'd3-k2'],
    },
    {
      id: 'daily-multi',
      type: 'Foundation',
      title: 'Daily Multi',
      price: 42,
      subscribePrice: 36,
      description:
        'Complete micronutrient foundation with methylated B-vitamins, chelated minerals, and antioxidant support — one ritual, every morning.',
      longDescription:
        'A foundational multi designed for absorption, not label padding. Methylfolate and methylcobalamin for MTHFR-sensitive users; chelated zinc and selenium at meaningful doses.',
      serving: '2 capsules with breakfast',
      format: '60 capsules · 1-month supply',
      testing: 'Third-party tested every batch',
      image: 'images/daily-multi.png',
      imageAlt: 'Daily Multi — white bottle with multivitamin caplets',
      highlights: [
        'Methylated B12 + folate (5-MTHF)',
        'Iron-free — stacks with most formulas',
        'One morning ritual, two capsules',
      ],
      ingredients: [
        { name: 'Vitamin A (as beta-carotene)', amount: '900 mcg RAE', dv: '100%' },
        { name: 'Vitamin C (as ascorbate)', amount: '90 mg', dv: '100%' },
        { name: 'Zinc (as bisglycinate)', amount: '11 mg', dv: '100%' },
        { name: 'Selenium (as selenomethionine)', amount: '55 mcg', dv: '100%' },
      ],
      howToUse:
        'Take 2 capsules with breakfast. Separate from magnesium by 2+ hours for optimal mineral absorption.',
      stackWith: ['omega-3', 'd3-k2'],
    },
  ],
  benefits: [
    {
      icon: '◆',
      title: 'Transparent labels',
      text: 'Every ingredient at clinical doses — no proprietary blends hiding behind marketing.',
    },
    {
      icon: '◇',
      title: 'Third-party tested',
      text: 'Independent labs verify potency, purity, and heavy metals on every batch.',
    },
    {
      icon: '○',
      title: 'Designed for daily use',
      text: 'Gentle formats, clear directions, and stacks that work together.',
    },
  ],
  story: {
    eyebrow: 'Formulation',
    heading: 'Only what your body can use.',
    text: 'We source bioavailable forms, publish full supplement facts, and formulate with clinicians — not influencers.',
    points: [
      'Chelated minerals for absorption',
      'Delayed-release capsules where it matters',
      'No artificial dyes or titanium dioxide',
    ],
  },
};
