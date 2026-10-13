export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  category: "Digest & Eat" | "Biryani & Rice" | "Signature Starters" | "South Indian Specials" | "Refreshing Mocktails" | "Artisanal Desserts";
  description: string;
  story?: string;
  pricePaise: number;
  vegetarian: boolean;
  available: boolean;
  image: string;
  spiceLevel?: 1 | 2 | 3; // 1 = mild, 2 = medium, 3 = fiery
  bestseller?: boolean;
  tags?: string[];
  healthBenefits?: string;
};

// All prices in paise.
// The 8 rasam prices are authentic owner-supplied prices.
export const menuItems: MenuItem[] = [
  // --- DIGEST & EAT (TRADITIONAL HEALING RASAMS) ---
  {
    id: "rasam-thakkali",
    slug: "thakkali-rasam",
    name: "Thakkali Rasam",
    category: "Digest & Eat",
    description: "Classic country tomato rasam infused with crushed cumin, garlic, and fresh coriander.",
    story: "Simmered slow in heritage earthenware with sun-ripened native tomatoes and stone-ground spices.",
    pricePaise: 7000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Homestyle", "Tangy", "Traditional"],
    healthBenefits: "Rich in lycopene and vitamin C; aids digestive enzymes after meals."
  },
  {
    id: "rasam-pacha-puli",
    slug: "pacha-puli-rasam",
    name: "Pacha Puli Rasam",
    category: "Digest & Eat",
    description: "Raw tamarind broth with hand-crushed shallots, green chilies, and tempered curry leaves.",
    story: "A rare Kongu-belt village delicacy made without boiling to preserve raw earthy tartness.",
    pricePaise: 8000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 2,
    tags: ["Kongu Heritage", "Raw Tamarind", "Refreshing"],
    healthBenefits: "Natural liver tonic and restores electrolyte balance on hot days."
  },
  {
    id: "rasam-milagu",
    slug: "milagu-rasam",
    name: "Milagu Rasam",
    category: "Digest & Eat",
    description: "Black pepper-forward fiery broth with roasted cumin and garlic pearls.",
    story: "The ultimate South Indian healing elixir, grandmother's time-tested cold and throat remedy.",
    pricePaise: 9000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Medicinal", "Pepper Punch", "Immunity"],
    healthBenefits: "Powerful decongestant; stimulates respiratory health and speeds metabolism."
  },
  {
    id: "rasam-pudhina",
    slug: "pudhina-rasam",
    name: "Pudhina Rasam",
    category: "Digest & Eat",
    description: "Aromatic garden mint extract blended into a soothing tamarind-pepper broth.",
    story: "Crisp mountain mint leaves crushed fresh at the mortar stone for an uplifting herbal aroma.",
    pricePaise: 8000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 1,
    tags: ["Mint Fresh", "Herbal", "Cooling"],
    healthBenefits: "Soothes irritable stomachs and relieves post-meal bloating."
  },
  {
    id: "rasam-kollu",
    slug: "kollu-parupu-rasam",
    name: "Kollu Parupu Rasam",
    category: "Digest & Eat",
    description: "Earthy horse-gram and lentil reduction tempered with wild mustard and dry red chilies.",
    story: "Centuries-old farmers' recipe celebrated across Tamil heartlands for stamina and warmth.",
    pricePaise: 9000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 2,
    tags: ["High Protein", "Ancient Grain", "Earthy"],
    healthBenefits: "Aids weight management, reduces water retention, and warms the core."
  },
  {
    id: "rasam-parupu",
    slug: "parupu-rasam",
    name: "Parupu Rasam",
    category: "Digest & Eat",
    description: "Gentle toor dal nectar tempered in pure ghee with asafoetida and roasted cumin.",
    story: "Mild, silky, and deeply comforting homestyle comfort enjoyed across generations.",
    pricePaise: 8000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 1,
    tags: ["Comfort Food", "Ghee Tempered", "Kids Favorite"],
    healthBenefits: "Easy on digestion, high in bioavailable plant protein."
  },
  {
    id: "rasam-modakathan",
    slug: "modakathan-rasam",
    name: "Modakathan Rasam",
    category: "Digest & Eat",
    description: "Wild balloon-vine greens simmered in peppery spiced broth with roasted fenugreek.",
    story: "Prized Siddha herbal preparation harvested from traditional herb gardens.",
    pricePaise: 9000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 2,
    tags: ["Siddha Medicine", "Wild Herb", "Wellness"],
    healthBenefits: "Renowned in folklore for easing joint stiffness, arthritis, and fatigue."
  },
  {
    id: "rasam-murunga-keerai",
    slug: "murunga-keerai-rasam",
    name: "Murunga Keerai Rasam",
    category: "Digest & Eat",
    description: "Fresh drumstick leaves gently simmered with shallots, garlic, and cracked pepper.",
    story: "Superfood green broth infused with tree-ripened drumstick leaves plucked at dawn.",
    pricePaise: 8000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 1,
    tags: ["Moringa Power", "Iron Rich", "Nutrient Dense"],
    healthBenefits: "Loaded with iron, calcium, and antioxidants for overall vitality."
  },

  // --- BIRYANI & RICE ---
  {
    id: "biryani-ambur",
    slug: "ambur-royal-biryani",
    name: "Ambur Royal Biryani",
    category: "Biryani & Rice",
    description: "Fragrant short-grain Seeraga Samba rice dum-cooked with tender spiced chicken, curd, and mint.",
    story: "Crafted in the famed Nawabi tradition of Ambur with red chili paste and no artificial coloring.",
    pricePaise: 27000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Seeraga Samba", "Dum Biryani", "Chef Special"]
  },
  {
    id: "biryani-chettinad-mutton",
    slug: "chettinad-mutton-biryani",
    name: "Chettinad Mutton Biryani",
    category: "Biryani & Rice",
    description: "Succulent country mutton cooked with 18 roasted spices, stone flower (kalpasi), and shallots.",
    story: "A royal Chettiar feast centerpiece bursting with aromatic marathi moggu and ghee.",
    pricePaise: 34000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Mutton", "Chettinad Masala", "Weekend Special"]
  },
  {
    id: "rice-ghee-sambar",
    slug: "ghee-sambar-rice-potato",
    name: "Heritage Ghee Sambar Rice",
    category: "Biryani & Rice",
    description: "Slow-simmered rice in drumstick & shallot sambar drenched in pure cow ghee, served with potato roast.",
    story: "The quintessential South Indian soul comfort bowl, topped with fried curry leaves.",
    pricePaise: 14000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    tags: ["Pure Ghee", "Soul Food", "Comfort"]
  },
  {
    id: "rice-curd-special",
    slug: "tempered-curd-rice",
    name: "Temple Style Curd Rice",
    category: "Biryani & Rice",
    description: "Creamy set curd rice tempered with mustard, ginger, green chilies, pomegranate pearls, and mor milagai.",
    story: "Chilled, velvety comfort finished with crunchy sun-dried buttermilk chilies.",
    pricePaise: 12000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    tags: ["Cooling", "Probiotic", "Temple Recipe"]
  },

  // --- SIGNATURE STARTERS ---
  {
    id: "starter-madurai-fire-chicken",
    slug: "madurai-fire-chicken",
    name: "Madurai Fire Chicken",
    category: "Signature Starters",
    description: "Crispy chicken tossed in fiery roasted spices, crushed garlic pearls, and fresh curry leaves.",
    story: "Inspired by Madurai night street kadas, packed with smoky chili heat and tangy lemon zest.",
    pricePaise: 25000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Crispy", "Spicy", "Street Style"]
  },
  {
    id: "starter-vazhaipoo-cutlet",
    slug: "vazhaipoo-cutlet",
    name: "Vazhaipoo (Banana Flower) Cutlets",
    category: "Signature Starters",
    description: "Crisp patties of finely minced banana blossoms, fennel, roasted lentils, and mint chutney.",
    story: "A laborious heritage delicacy celebrating ancient zero-waste banana grove traditions.",
    pricePaise: 18000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 1,
    tags: ["Artisanal", "Heritage Veg", "Fiber Rich"]
  },
  {
    id: "starter-curry-leaf-paneer",
    slug: "karuveppilai-crispy-paneer",
    name: "Karuveppilai Crispy Paneer",
    category: "Signature Starters",
    description: "Fresh cottage cheese cubes batter-fried in an aromatic dark green curry leaf and pepper crust.",
    story: "Vibrant emerald crunch infused with hand-plucked fresh curry leaf reduction.",
    pricePaise: 21000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 2,
    tags: ["Paneer Lover", "Curry Leaf Aroma", "Crunchy"]
  },

  // --- SOUTH INDIAN SPECIALS ---
  {
    id: "special-madurai-kari-dosa",
    slug: "madurai-kari-dosa",
    name: "Madurai Royal Kari Dosa",
    category: "South Indian Specials",
    description: "Thick spongy kal dosa layered with beaten egg, rich minced mutton chukka, and drizzled with ghee.",
    story: "Legendary Madurai icon with triple layers of fluffy fermented batter, egg, and spicy meat.",
    pricePaise: 24000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Legendary", "Kari Dosa", "Pure Indulgence"]
  },
  {
    id: "special-coin-parotta-salna",
    slug: "coin-parotta-ennai-kathirikai",
    name: "Coin Parotta with Ennai Kathirikai",
    category: "South Indian Specials",
    description: "Four mini golden flaky multi-layered parottas served with rich baby brinjal gravy and coconut salna.",
    story: "Hand-stretched, beaten and griddled on iron tawas to achieve paper-crisp golden flakiness.",
    pricePaise: 17000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    tags: ["Flaky Parotta", "Kathirikai Salna", "Crowd Favorite"]
  },
  {
    id: "special-ghee-roast-dosa",
    slug: "crispy-ghee-roast-dosa",
    name: "Nattu Ghee Roast Cone Dosa",
    category: "South Indian Specials",
    description: "Paper-thin golden crisp crepe roasted in fragrant country cow ghee, served with 3 chutneys & sambar.",
    story: "Crisped to a golden cone with the irresistible nutty aroma of clarified butter.",
    pricePaise: 15000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 1,
    tags: ["Crispy Cone", "Pure Ghee", "Classic"]
  },

  // --- REFRESHING MOCKTAILS & TRADITIONAL COOLERS ---
  {
    id: "mocktail-nannari",
    slug: "nannari-fizz",
    name: "Nannari Fizz",
    category: "Refreshing Mocktails",
    description: "Handcrafted sarsaparilla root syrup blended with sparkling soda, freshly squeezed lime, and mint.",
    story: "Ancient Ayurvedic cooling root drink served with a modern sparkling effervescence.",
    pricePaise: 13000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Root Cooler", "Sparkling", "Natural Tonic"]
  },
  {
    id: "mocktail-jigarthanda",
    slug: "madurai-jigarthanda-royale",
    name: "Madurai Jigarthanda Royale",
    category: "Refreshing Mocktails",
    description: "Layered almond gum (badam pisin), nannari reduction, reduced basundi milk, topped with malai ice cream.",
    story: "Literally meaning 'Heart Cooler'—a royal drink introduced by the Mughal governors of Madurai.",
    pricePaise: 16000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Madurai Icon", "Creamy", "Heart Cooler"]
  },
  {
    id: "mocktail-elaneer-cooler",
    slug: "tender-coconut-elaneer-cooler",
    name: "Tender Coconut Elaneer Cooler",
    category: "Refreshing Mocktails",
    description: "Pure tender coconut water muddled with delicate coconut malai, a whisper of cardamom, and lime.",
    story: "Sourced from local Pollachi farms for unadulterated tropical freshness.",
    pricePaise: 14000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    tags: ["Pollachi Coconuts", "Hydrating", "Electrolytes"]
  },

  // --- ARTISANAL DESSERTS ---
  {
    id: "dessert-elaneer-payasam",
    slug: "elaneer-payasam",
    name: "Elaneer Payasam",
    category: "Artisanal Desserts",
    description: "Velvety pudding of tender coconut pulp, condensed milk, coconut milk, and roasted cashews.",
    story: "A sublime South Indian wedding dessert with delicate sweetness that melts on your tongue.",
    pricePaise: 14000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    tags: ["Tender Coconut", "Silky", "Celebration"]
  },
  {
    id: "dessert-halwa-pot",
    slug: "tirunelveli-wheat-halwa-pot",
    name: "Warm Tirunelveli Wheat Halwa Pot",
    category: "Artisanal Desserts",
    description: "Glistening wheat halwa made with fermented wheat milk and rich ghee, served warm with roasted nuts.",
    story: "Slow-stirred in traditional heavy bronze urulis for that signature glossy, chewy texture.",
    pricePaise: 13000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    tags: ["Pure Ghee", "Authentic Halwa", "Warm Finish"]
  }
];

export const categories = [
  "Digest & Eat",
  "Biryani & Rice",
  "Signature Starters",
  "South Indian Specials",
  "Refreshing Mocktails",
  "Artisanal Desserts"
] as const;

export const formatINR = (paise: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(paise / 100);

export const getProduct = (slug: string) =>
  menuItems.find((item) => item.slug === slug && item.available);

export const getFeaturedProducts = () =>
  menuItems.filter((item) => item.bestseller || item.category === "Digest & Eat");