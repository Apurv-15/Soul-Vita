import { Product, BrandCommitment } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'mandarin-peach',
    name: 'Soul Viva Mandarin & Peach Moisturising Gel Bar',
    tagline: 'A bathing experience that feels like a burst of citrus energy. Bright, juicy notes awaken your senses, filling the air with vibrant freshness. Lively, uplifting, and radiant. Soul Viva Mandarin & Peach moisturising gel bar brings that feeling to your shower, leaving your skin energised and fresh.',
    subtitle: 'For Energised Fresh Skin',
    description: 'A bathing experience that feels like a burst of citrus energy. Bright, juicy notes awaken your senses, filling the air with vibrant freshness. Lively, uplifting, and radiant. Soul Viva Mandarin & Peach moisturising gel bar brings that feeling to your shower, leaving your skin energised and fresh.',
    longDescription: 'A bathing experience that feels like a burst of citrus energy. Bright, juicy notes awaken your senses, filling the air with vibrant freshness. Lively, uplifting, and radiant. Soul Viva Mandarin & Peach moisturising gel bar brings that feeling to your shower, leaving your skin energised and fresh.',
    price: 35,
    weight: '100g when packed',
    pHLevel: '5.5 (Acid Balanced)',
    skinType: 'All skin types',
    accentClass: 'from-orange-100 to-amber-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(249,115,22,0.25)]',
    themeColor: '#FFE5D9',
    badge: 'Citrus Energy',
    image: '/Mandarin/Soul Viva - Mandarin & Peach - Product 2.png',
    bgImage: '/Images/Mandarin.png',
    video: '/Video/Mandarin_video.mp4',
    images: [
      '/Images/Mandarin.png',
      '/Mandarin/Soul Viva - Mandarin & Peach - Front 1.png',
      '/Mandarin/Soul Viva - Mandarin & Peach - Left 1.png',
      '/Ingredient Story/Ingredient Story - Orange - 1.png',
      '/Ingredient Story/Ingredient Story - Orange - 2.png'
    ],
    scentNotes: {
      top: ['Sun-Kissed Mandarin', 'Sweet Satsuma'],
      heart: ['White Peach Nectar', 'Bitter Orange Bloom'],
      base: ['Warm Vetiver', 'Cedar Wood']
    },
    keyIngredients: [
      {
        name: 'Mandarin Extract',
        role: 'Vibrancy Stimulator',
        source: 'Calabrian Groves',
        description: 'Refreshes and energises skin with natural extract of refreshing mandarin.',
        image: '/Ingredient Story/Ingredient Story - Orange - 1.png'
      },
      {
        name: 'Peach Extract',
        role: 'Texture Velvetizer',
        source: 'Organic Orchards',
        description: 'Softens and smoothens skin with natural extract of juicy peaches.',
        image: '/Ingredient Story/Ingredient Story - Orange - 2.png'
      },
      {
        name: 'Glycerin',
        role: 'Elasticizer',
        source: 'Vegetable',
        description: 'Draws in moisture, keeping skin soft and smooth all day long'
      }
    ],
    sensoryProfile: {
      hydration: 88,
      purity: 96,
      latherDensity: 90,
      longevity: 70
    },
    productCategory: 'Glycerin Based transparent gel bathing bar',
    caseConfiguration: '8 shrinkpacks of 6 units = 48 units per master carton',
    shelfLife: '24 months from date of manufacture',
    countryOfOrigin: 'India',
    eanBarcode: '8908030764027',
    packaging: 'Individually flow-wrapped bar, presented in full-colour printed monocarton with matte lamination and Spot UV',
    inciIngredients: 'Sodium Laureth Sulfate, Aqua, Cocamidopropyl Betaine, Glycerin, Sodium Chloride, Parfum, Citrus Reticulata (Mandarin) Peel Extract, Prunus Persica (Peach) Fruit Extract, Cocamide DEA, Citric Acid, Sodium Benzoate, Potassium Sorbate, CI 15985, CI 14720',
    claims: [
      '100% Natural Extracts',
      'Dermatologically Tested',
      'Cruelty Free',
      'Paraben Free',
      'Silicone Free',
      'Suitable for All Skin Types'
    ]
  },
  {
    id: 'waterlily-pear',
    name: 'Soul Viva Waterlily & Pear Moisturising Gel Bar',
    tagline: 'A bathing experience that feels like standing under the fresh water of a tropical waterfall, surrounded by lush greens and soft blooms. Pure, vibrant, and alive. Soul Viva Waterlily & Pear moisturising gel bar brings that feeling to your shower, leaving your skin dewy and fresh.',
    subtitle: 'For Dewy Fresh Skin',
    description: 'A bathing experience that feels like standing under the fresh water of a tropical waterfall, surrounded by lush greens and soft blooms. Pure, vibrant, and alive. Soul Viva Waterlily & Pear moisturising gel bar brings that feeling to your shower, leaving your skin dewy and fresh.',
    longDescription: 'A bathing experience that feels like standing under the fresh water of a tropical waterfall, surrounded by lush greens and soft blooms. Pure, vibrant, and alive. Soul Viva Waterlily & Pear moisturising gel bar brings that feeling to your shower, leaving your skin dewy and fresh.',
    price: 35,
    weight: '100g when packed',
    pHLevel: '5.5 (Acid Balanced)',
    skinType: 'All skin types',
    accentClass: 'from-emerald-50 to-teal-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(52,211,153,0.25)]',
    themeColor: '#E6F4EA',
    badge: 'Dewy Fresh',
    image: '/Waterlily and Pear/Soul Viva - Waterlily & Pear - Front 1.png',
    bgImage: '/Images/Waterlily_kv.jpeg',
    video: '/Video/waterlily.mp4',
    images: [
      '/Images/Waterlily_kv.jpeg',
      '/Waterlily and Pear/Soul Viva - Waterlily & Pear - Front 1.png',
      '/Waterlily and Pear/Soul Viva - Waterlily & Pear - Left 1.png',
      '/Ingredient Story/Ingredient Story - Green - 1.png',
      '/Ingredient Story/Ingredient Story - Green - 2.png'
    ],
    scentNotes: {
      top: ['Crisp Pear', 'Lush Greens'],
      heart: ['Waterlily Extract', 'Lotus Blooms'],
      base: ['Fresh Dew', 'Soft Cedarwood']
    },
    keyIngredients: [
      {
        name: 'Waterlily Extract',
        role: 'Flora Rejuvenator',
        source: 'Aquatic Flowers',
        description: 'Hydrates and refreshes skin with natural extracts of waterily.',
        image: '/Ingredient Story/Ingredient Story - Green - 1.png'
      },
      {
        name: 'Pear Extract',
        role: 'Aromatic Softener',
        source: 'Pressed Pears',
        description: 'Leaves skin soft and supple with natural extract of gentle and juicy pear.',
        image: '/Ingredient Story/Ingredient Story - Green - 2.png'
      },
      {
        name: 'Glycerin',
        role: 'Dewy Base',
        source: 'Vegetable Oils',
        description: 'Draws in moisture, keeping skin soft and smooth all day long'
      }
    ],
    sensoryProfile: {
      hydration: 97,
      purity: 95,
      latherDensity: 82,
      longevity: 78
    },
    productCategory: 'Glycerin Based transparent gel bathing bar',
    caseConfiguration: '8 shrinkpacks of 6 units = 48 units per master carton',
    shelfLife: '24 months from date of manufacture',
    countryOfOrigin: 'India',
    eanBarcode: '8908030764003',
    packaging: 'Individually flow-wrapped bar, presented in full-colour printed monocarton with matte lamination and Spot UV',
    inciIngredients: 'Sodium Laureth Sulfate, Aqua, Cocamidopropyl Betaine, Glycerin, Sodium Chloride, Parfum, Nymphaea Alba (Waterlily) Flower Extract, Pyrus Communis (Pear) Fruit Extract, Cocamide DEA, Citric Acid, Sodium Benzoate, Potassium Sorbate, CI 42090, CI 19140',
    claims: [
      '100% Natural Extracts',
      'Dermatologically Tested',
      'Cruelty Free',
      'Paraben Free',
      'Silicone Free',
      'Suitable for All Skin Types'
    ]
  },
  {
    id: 'lavender-currant',
    name: 'Soul Viva Black Currant & Lavender Moisturising Gel Bar',
    tagline: 'A bathing experience that feels like sinking into a calming lavender bath. Soft aromas ease the mind while gentle warmth relaxes the body. Deeply soothing and serene. Soul Viva Black Currant & Lavender moisturising gel bar brings that feeling to your shower, leaving you calm and comforted.',
    subtitle: 'For Smooth & Happy Skin',
    description: 'A bathing experience that feels like sinking into a calming lavender bath. Soft aromas ease the mind while gentle warmth relaxes the body. Deeply soothing and serene. Soul Viva Black Currant & Lavender moisturising gel bar brings that feeling to your shower, leaving you calm and comforted.',
    longDescription: 'A bathing experience that feels like sinking into a calming lavender bath. Soft aromas ease the mind while gentle warmth relaxes the body. Deeply soothing and serene. Soul Viva Black Currant & Lavender moisturising gel bar brings that feeling to your shower, leaving you calm and comforted.',
    price: 35,
    weight: '100g when packed',
    pHLevel: '5.5 (Skin Balanced)',
    skinType: 'All skin types',
    accentClass: 'from-purple-100 to-indigo-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(168,85,247,0.25)]',
    themeColor: '#ECCDF2',
    badge: 'Pure Relaxation',
    image: '/Black Currant/Soul Viva - Black Currant & Lavender - Front 1.png',
    bgImage: '/Images/Black_current_kv.jpeg',
    video: '/Video/Sun_rises_over_lavender.mp4',
    images: [
      '/Images/Black_current_kv.jpeg',
      '/Black Currant/Soul Viva - Black Currant & Lavender - Front 1.png',
      '/Black Currant/Soul Viva - Black Currant & Lavender - Left 1.png',
      '/Ingredient Story/Ingredient Story - Purple - 1.png',
      '/Ingredient Story/Ingredient Story - Purple - 2.png'
    ],
    scentNotes: {
      top: ['Black Currant Buds', 'Deep Berries'],
      heart: ['French Lavender', 'Warm Chamomile'],
      base: ['Amberwood', 'Sustainable Sandalwood']
    },
    keyIngredients: [
      {
        name: 'Black Currant Extract',
        role: 'Lipid Nourisher',
        source: 'Forest Currants',
        description: 'Nourishes for smoother skin with natural extracts of antioxidant-rich black currant',
        image: '/Ingredient Story/Ingredient Story - Purple - 1.png'
      },
      {
        name: 'Lavender Extract',
        role: 'Epidermal Calmer',
        source: 'Provence Lavender',
        description: 'Calms and soothes skin with natural extracts of lavender blooms.',
        image: '/Ingredient Story/Ingredient Story - Purple - 2.png'
      },
      {
        name: 'Glycerin',
        role: 'Skin Smoother',
        source: 'Botanical',
        description: 'Draws in moisture, keeping skin soft and smooth all day long'
      }
    ],
    sensoryProfile: {
      hydration: 94,
      purity: 98,
      latherDensity: 88,
      longevity: 85
    },
    productCategory: 'Glycerin Based transparent gel bathing bar',
    caseConfiguration: '8 shrinkpacks of 6 units = 48 units per master carton',
    shelfLife: '24 months from date of manufacture',
    countryOfOrigin: 'India',
    eanBarcode: '8908030764041',
    packaging: 'Individually flow-wrapped bar, presented in full-colour printed monocarton with matte lamination and Spot UV',
    inciIngredients: 'Sodium Laureth Sulfate, Aqua, Cocamidopropyl Betaine, Glycerin, Sodium Chloride, Parfum, Ribes Nigrum (Black Currant) Fruit Extract, Lavandula Angustifolia (Lavender) Flower Extract, Cocamide DEA, Citric Acid, Sodium Benzoate, Potassium Sorbate, CI 42090, CI 17200',
    claims: [
      '100% Natural Extracts',
      'Dermatologically Tested',
      'Cruelty Free',
      'Paraben Free',
      'Silicone Free',
      'Suitable for All Skin Types'
    ]
  },
  {
    id: 'shea-honey',
    name: 'Soul Viva Shea Butter & Honey Moisturising Gel Bar',
    tagline: 'A bathing experience that feels like a warm cosy hug. Rich, creamy softness that leaves your skin feeling nourished and comforted. Soul Viva Shea Butter & Honey moisturising gel bar brings that feeling to your shower, leaving your skin deeply nourished and soft.',
    subtitle: 'For Deeply Nourished Skin',
    description: 'A bathing experience that feels like a warm cosy hug. Rich, creamy softness that leaves your skin feeling nourished and comforted. Soul Viva Shea Butter & Honey moisturising gel bar brings that feeling to your shower, leaving your skin deeply nourished and soft.',
    longDescription: 'A bathing experience that feels like a warm cosy hug. Rich, creamy softness that leaves your skin feeling nourished and comforted. Soul Viva Shea Butter & Honey moisturising gel bar brings that feeling to your shower, leaving your skin deeply nourished and soft.',
    price: 35,
    weight: '100g when packed',
    pHLevel: '5.6 (lipid-rich)',
    skinType: 'All skin types',
    accentClass: 'from-amber-100 to-yellow-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(245,158,11,0.25)]',
    themeColor: '#FFE5D9',
    badge: 'Comfort Shield',
    image: '/Shea and butter/Soul Viva - Shea Butter & Honey - Front 1.png',
    bgImage: '/Images/Shea_butter.jpeg',
    video: '/Video/Shea_butter.mp4',
    images: [
      '/Images/Shea_butter.jpeg',
      '/Shea and butter/Soul Viva - Shea Butter & Honey - Front 1.png',
      '/Shea and butter/Soul Viva - Shea Butter & Honey - Right 1.png',
      '/Ingredient Story/Ingredient Story - Yellow - 1.png',
      '/Ingredient Story/Ingredient Story - Yellow - 2.png'
    ],
    scentNotes: {
      top: ['Warm Honeycomb', 'Amaretto Blossom'],
      heart: ['Creamy Raw Shea', 'Wild Heather'],
      base: ['Vanilla Bean', 'Rich Labdanum']
    },
    keyIngredients: [
      {
        name: 'Shea Butter',
        role: 'Deep Nourisher',
        source: 'Cold-Pressed Nut Oil',
        description: 'Deeply nourishes dry skin with the goodness of nourishing  shea butter.',
        image: '/Ingredient Story/Ingredient Story - Yellow - 1.png'
      },
      {
        name: 'Honey Extract',
        role: 'Conditioner',
        source: 'Forest Beehive Extract',
        description: 'Leaves skin soft and smooth with natural honey with its humectant properties',
        image: '/Ingredient Story/Ingredient Story - Yellow - 2.png'
      },
      {
        name: 'Glycerin',
        role: 'Humectant Lock',
        source: 'Sustainable Sourced Plants',
        description: 'Draws in moisture, keeping skin soft and smooth all day long'
      }
    ],
    sensoryProfile: {
      hydration: 98,
      purity: 92,
      latherDensity: 95,
      longevity: 82
    },
    productCategory: 'Glycerin Based transparent gel bathing bar',
    caseConfiguration: '8 shrinkpacks of 6 units = 48 units per master carton',
    shelfLife: '24 months from date of manufacture',
    countryOfOrigin: 'India',
    eanBarcode: '8908030764010',
    packaging: 'Individually flow-wrapped bar, presented in full-colour printed monocarton with matte lamination and Spot UV',
    inciIngredients: 'Sodium Laureth Sulfate, Aqua, Cocamidopropyl Betaine, Glycerin, Butyrospermum Parkii (Shea) Butter, Sodium Chloride, Parfum, Mel (Honey) Extract, Cocamide DEA, Citric Acid, Sodium Benzoate, Potassium Sorbate, CI 19140, CI 15985',
    claims: [
      '100% Natural Extracts',
      'Dermatologically Tested',
      'Cruelty Free',
      'Paraben Free',
      'Silicone Free',
      'Suitable for All Skin Types'
    ]
  },
  {
    id: 'cherry-blossom-strawberry',
    name: 'Soul Viva Cherry Blossom & Strawberry Moisturising Gel Bar',
    tagline: 'A bathing experience that feels like standing beneath blooming cherry blossoms. Petals drifting in the air as a sweet, delicate fragrance surrounds you. Light, tender, and romantic. Soul Viva Cherry Blossom & Strawberry moisturising gel bar brings that feeling to your shower, leaving your skin soft and glowing.',
    subtitle: 'For Soft Glowing Skin',
    description: 'A bathing experience that feels like standing beneath blooming cherry blossoms. Petals drifting in the air as a sweet, delicate fragrance surrounds you. Light, tender, and romantic. Soul Viva Cherry Blossom & Strawberry moisturising gel bar brings that feeling to your shower, leaving your skin soft and glowing.',
    longDescription: 'A bathing experience that feels like standing beneath blooming cherry blossoms. Petals drifting in the air as a sweet, delicate fragrance surrounds you. Light, tender, and romantic. Soul Viva Cherry Blossom & Strawberry moisturising gel bar brings that feeling to your shower, leaving your skin soft and glowing.',
    price: 35,
    weight: '100g when packed',
    pHLevel: '5.5 (Skin Optimal)',
    skinType: 'All skin types',
    accentClass: 'from-pink-100 to-rose-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(244,63,94,0.25)]',
    themeColor: '#FFE4E6',
    badge: 'Romantic Bloom',
    image: '/Strawberry/Soul Viva - Cherry Blossom & Strawberry - Front 1.png',
    bgImage: '/Images/Cherry_blossom.jpeg',
    video: '/Video/vi.mp4',
    images: [
      '/Images/Cherry_blossom.jpeg',
      '/Strawberry/Soul Viva - Cherry Blossom & Strawberry - Front 1.png',
      '/Strawberry/Soul Viva - Cherry Blossom & Strawberry - Left 1.png',
      '/Ingredient Story/Ingredient Story - Pink - 1.png',
      '/Ingredient Story/Ingredient Story - Pink - 2.png'
    ],
    scentNotes: {
      top: ['Wild Strawberry', 'Red Berries'],
      heart: ['Cherry Blossom', 'Sakura Petals'],
      base: ['Warm Vanilla', 'Sugared Amber']
    },
    keyIngredients: [
      {
        name: 'Cherry Blossom Extract',
        role: 'Luminosity Perfector',
        source: 'Sakura Petals',
        description: "Enhances skin's natural glow with natural extracts of brightening cherry blossoms",
        image: '/Ingredient Story/Ingredient Story - Pink - 1.png'
      },
      {
        name: 'Strawberry Extract',
        role: 'Radiance Booster',
        source: 'Ripe Strawberries',
        description: 'Leaves skin radiant with natural extract of juicy strawberries.',
        image: '/Ingredient Story/Ingredient Story - Pink - 2.png'
      },
      {
        name: 'Glycerin',
        role: 'Elastic Cushioner',
        source: 'Vegetable Source',
        description: 'Draws in moisture, keeping skin soft and smooth all day long'
      }
    ],
    sensoryProfile: {
      hydration: 92,
      purity: 90,
      latherDensity: 88,
      longevity: 82
    },
    productCategory: 'Glycerin Based transparent gel bathing bar',
    caseConfiguration: '8 shrinkpacks of 6 units = 48 units per master carton',
    shelfLife: '24 months from date of manufacture',
    countryOfOrigin: 'India',
    eanBarcode: '8908030764034',
    packaging: 'Individually flow-wrapped bar, presented in full-colour printed monocarton with matte lamination and Spot UV',
    inciIngredients: 'Sodium Laureth Sulfate, Aqua, Cocamidopropyl Betaine, Glycerin, Sodium Chloride, Parfum, Prunus Serrulata (Cherry Blossom) Flower Extract, Fragaria Vesca (Strawberry) Fruit Extract, Cocamide DEA, Citric Acid, Sodium Benzoate, Potassium Sorbate, CI 17200, CI 45410',
    claims: [
      '100% Natural Extracts',
      'Dermatologically Tested',
      'Cruelty Free',
      'Paraben Free',
      'Silicone Free',
      'Suitable for All Skin Types'
    ]
  },
  {
    id: 'sea-minerals-menthol',
    name: 'Soul Viva Sea Minerals & Menthol Moisturising Gel Bar',
    tagline: 'A bathing experience that feels like a dip in the ocean — cool, crisp, and alive. Waves wash over you as freshness awakens every sense. Beneath it all, a quiet calm. Soul Viva Sea Minerals & Menthol moisturising gel bar brings that feeling to your shower, leaving you cool and refreshed.',
    subtitle: 'For Cool, Refreshed & Purified Skin',
    description: 'A bathing experience that feels like a dip in the ocean — cool, crisp, and alive. Waves wash over you as freshness awakens every sense. Beneath it all, a quiet calm. Soul Viva Sea Minerals & Menthol moisturising gel bar brings that feeling to your shower, leaving you cool and refreshed.',
    longDescription: 'A bathing experience that feels like a dip in the ocean — cool, crisp, and alive. Waves wash over you as freshness awakens every sense. Beneath it all, a quiet calm. Soul Viva Sea Minerals & Menthol moisturising gel bar brings that feeling to your shower, leaving you cool and refreshed.',
    price: 35,
    weight: '100g when packed',
    pHLevel: '5.5 (Skin-Identical)',
    skinType: 'All skin types',
    accentClass: 'from-sky-100 to-blue-50',
    bloomShadowClass: 'shadow-[0_0_60px_rgba(56,189,248,0.3)]',
    themeColor: '#DFEAF2',
    badge: 'Cooling Rush',
    image: '/Sea Minerals/Soul Viva - Sea Minerals & Menthol - Front 1.png',
    bgImage: '/Images/Sea_mineral_kv.jpeg',
    video: '/Video/Sea_minerals.mp4',
    images: [
      '/Images/Sea_mineral_kv.jpeg',
      '/Sea Minerals/Soul Viva - Sea Minerals & Menthol - Front 1.png',
      '/Sea Minerals/Soul Viva - Sea Minerals & Menthol - Left 1.png',
      '/Ingredient Story/Ingredient Story - Blue - 1.png',
      '/Ingredient Story/Ingredient Story - Blue - 2.png'
    ],
    scentNotes: {
      top: ['Crisp Menthol', 'Marine Mist'],
      heart: ['Ozone Accord', 'Coastal Kelp'],
      base: ['Sea Salt', 'White Cedar']
    },
    keyIngredients: [
      {
        name: 'Sea Minerals',
        role: 'Purifying Cleanser',
        source: 'Ocean Purity',
        description: 'Cleanse and refresh with ocean-derived minerals',
        image: '/Ingredient Story/Ingredient Story - Blue - 1.png'
      },
      {
        name: 'Menthol',
        role: 'Instant Refresher',
        source: 'Peppermint Distillate',
        description: 'Delivers an instant cooling rush and invigorating refreshing sensation of menthol',
        image: '/Ingredient Story/Ingredient Story - Blue - 2.png'
      },
      {
        name: 'Glycerin',
        role: 'Humectant Protector',
        source: 'Organic Plants',
        description: 'Draws in moisture, keeping skin soft and smooth all day long'
      }
    ],
    sensoryProfile: {
      hydration: 95,
      purity: 100,
      latherDensity: 85,
      longevity: 80
    },
    productCategory: 'Glycerin Based transparent gel bathing bar',
    caseConfiguration: '8 shrinkpacks of 6 units = 48 units per master carton',
    shelfLife: '24 months from date of manufacture',
    countryOfOrigin: 'India',
    eanBarcode: '8908030764058',
    packaging: 'Individually flow-wrapped bar, presented in full-colour printed monocarton with matte lamination and Spot UV',
    inciIngredients: 'Sodium Laureth Sulfate, Aqua, Cocamidopropyl Betaine, Glycerin, Sodium Chloride, Parfum, Aqua Marina (Sea Water) Extract, Menthol, Cocamide DEA, Citric Acid, Sodium Benzoate, Potassium Sorbate, CI 42090',
    claims: [
      '100% Natural Extracts',
      'Dermatologically Tested',
      'Cruelty Free',
      'Paraben Free',
      'Silicone Free',
      'Suitable for All Skin Types'
    ]
  }
];

export const COMMITMENTS: BrandCommitment[] = [
  {
    id: 'dermatological',
    title: 'Dermatologically Tested',
    description: 'Every formulation undergoes rigorous, third-party clinical trials to guarantee zero skin irritation and maximum biocompatibility.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'crueltyfree',
    title: 'Cruelty Free & Vegan',
    description: 'We never test on animals, nor do we use any animal-derived ingredients (no tallow, lard, or animal gelatin). Safe, ethical, clean.',
    iconName: 'Sparkles'
  },
  {
    id: 'natureextracted',
    title: '100% Natural Distillates',
    description: 'Leveraging clean botanical extracts, supercritical CO2 oils, and cold-pressed blossom nectars for honest, organic nourishment.',
    iconName: 'Droplet'
  },
  {
    id: 'parabenfree',
    title: 'Zero Synthetic Fillers',
    description: 'Completely free from parabens, phthalates, synthetic binding starches, petroleum diluents or endocrine disruptors.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'siliconefree',
    title: 'Water Soluble Purity',
    description: 'Designed to rinse completely clean, leaving no hydrophobic layer of silicones or residue to block respiratory skin pores.',
    iconName: 'CheckCircle2'
  }
];

export const STORIES = [
  {
    year: '2022',
    heading: 'The Transparent Dream',
    content: 'We set outer boundaries to create a soap bar that acts like condensed water: beautiful, glasslike, and light-reflective, yet overflowing with natural emollients. It took 310 micro-adjustments in raw glycerin purity to obtain stable transparency.'
  },
  {
    year: '2023',
    heading: 'The High-Viscosity Gel Matrix',
    content: 'Standard soap bars require synthetic drying starches to remain solid. We created a proprietary gel network that suspends deep skin humectants in a solid state using hydrogen bond stabilization, which melts beautifully into a clinical silk lather.'
  },
  {
    year: '2024',
    heading: 'Botanical Sanctuary Integration',
    content: 'We integrated pristine harvests—Kashmir Lavender, Meadow Honey, and Calabria Mandarin—creating three poetic sensory experiences where the bar embodies the pure atmosphere of their harvest origins.'
  }
];
