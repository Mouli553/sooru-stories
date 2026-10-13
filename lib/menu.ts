export type MenuCategory =
  | "Digest & Eat"
  | "Signature Starters"
  | "Signature Non-Veg"
  | "Biryani & Rice"
  | "South Indian Specials"
  | "Modern Fusion"
  | "Mocktails"
  | "Desserts";

export type MenuItem = {
  id: string;
  slug: string;
  name: string;
  category: MenuCategory;
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

// All prices in paise (₹1 = 100 paise).
// Direct official pricing from Sooru & Stories menu catalog & Rasam Chronicles.
export const menuItems: MenuItem[] = [
  // ===========================================================================
  // 1. DIGEST & EAT (THE 8 HERBAL HEALING RASAMS)
  // ===========================================================================
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
    tags: ["Ayurvedic", "Pepper Punch", "Immunity"],
    healthBenefits: "Piperine boosts respiratory immunity and clears congestion naturally."
  },
  {
    id: "rasam-jeeraga-poondu",
    slug: "jeeraga-poondu-rasam",
    name: "Jeeraga Poondu Rasam",
    category: "Digest & Eat",
    description: "Toasted cumin seeds and crushed country garlic steeped in clear lentil water.",
    story: "Pounded by hand in a stone mortar right before tempering with native mustard seeds.",
    pricePaise: 7500,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 1,
    tags: ["Digestive", "Garlic Broth", "Comfort"],
    healthBenefits: "Soothes acid reflux, eases digestion, and reduces post-meal bloating."
  },
  {
    id: "rasam-kollu",
    slug: "kollu-rasam",
    name: "Kollu Rasam (Horse Gram)",
    category: "Digest & Eat",
    description: "Nutrient-dense horse gram extract infused with black pepper and dried red chilies.",
    story: "An ancient warrior recipe from Kongu Nadu revered for sustained energy and endurance.",
    pricePaise: 8000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["High Protein", "Kongu Tradition", "Ancient Grain"],
    healthBenefits: "Stimulates lipid metabolism, regulates blood sugar, and warms the body."
  },
  {
    id: "rasam-veppam-poo",
    slug: "veppam-poo-rasam",
    name: "Veppam Poo Rasam (Neem Flower)",
    category: "Digest & Eat",
    description: "Sun-dried organic neem blossoms toasted in pure country ghee and finished in tamarind essence.",
    story: "Celebrated across Tamil Nadu during New Year traditions for seasonal gut cleansing.",
    pricePaise: 8500,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 1,
    tags: ["Detox", "Neem Flowers", "Medicinal"],
    healthBenefits: "Antiparasitic gut cleanser, purifies blood, and aids cellular detox."
  },
  {
    id: "rasam-mudakathan",
    slug: "mudakathan-rasam",
    name: "Mudakathan Rasam (Balloon Vine)",
    category: "Digest & Eat",
    description: "Freshly foraged balloon vine greens slow-extracted with black pepper and shallots.",
    story: "A sacred botanical preparation cherished in Chettinad homes for joint agility.",
    pricePaise: 9000,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 2,
    tags: ["Rare Botanical", "Joint Health", "Forest Foraged"],
    healthBenefits: "Potent anti-inflammatory properties that relieve joint aches and stiffness."
  },
  {
    id: "rasam-murungai-keerai",
    slug: "murungai-keerai-rasam",
    name: "Murungai Keerai Rasam (Moringa Leaf)",
    category: "Digest & Eat",
    description: "Fresh tender moringa greens simmered in iron-rich lentil broth and cumin tempering.",
    story: "Handpicked at dawn from local farm orchards for peak botanical vitality.",
    pricePaise: 8500,
    vegetarian: true,
    available: true,
    image: "/images/rasam-chronicles.jpg",
    spiceLevel: 1,
    tags: ["Superfood", "Iron Rich", "Moringa"],
    healthBenefits: "Powerhouse of dietary iron, calcium, and antioxidants for vitality."
  },

  // ===========================================================================
  // 2. SIGNATURE STARTERS (PDF Page 1)
  // ===========================================================================
  {
    id: "starter-madurai-fire-chicken",
    slug: "madurai-fire-chicken",
    name: "Madurai Fire Chicken",
    category: "Signature Starters",
    description: "Spicy crispy chicken bites tossed in fiery Guntur chili masala, fresh curry leaves, and crushed garlic.",
    story: "Inspired by Madurai's bustling late-night street tawa stalls with intense smokiness.",
    pricePaise: 25000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Crispy", "Fiery", "Street Style"]
  },
  {
    id: "starter-kovai-pepper-punch",
    slug: "kovai-pepper-punch",
    name: "Kovai Pepper Punch",
    category: "Signature Starters",
    description: "Pepper chicken bites tossed with whole cracked Tellicherry peppercorns and golden caramelized shallots.",
    story: "A Kongu belt specialty celebrating freshly harvested hill pepper and country ghee.",
    pricePaise: 26000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 2,
    tags: ["Kongu Style", "Black Pepper", "Tender"]
  },
  {
    id: "starter-naatu-kozhi-neruppu",
    slug: "naatu-kozhi-neruppu-roast",
    name: "Naatu Kozhi Neruppu Roast",
    category: "Signature Starters",
    description: "Country chicken spicy roast pan-seared over flame in iron kadai with hand-ground podi.",
    story: "Free-range country chicken slow-roasted to chewy, flavor-dense perfection with native spices.",
    pricePaise: 29000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Country Chicken", "Chef Special", "Flame Seared"]
  },
  {
    id: "starter-chennai-crunch",
    slug: "chennai-crunch-chicken",
    name: "Chennai Crunch Chicken",
    category: "Signature Starters",
    description: "Crispy fried chicken bites with signature South Indian spice batter and aromatic tempering.",
    story: "Crisp golden outside, succulent inside, finished with roasted curry leaves and green chilies.",
    pricePaise: 24000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 2,
    tags: ["Crispy Fried", "Chennai Street", "Snack Favourites"]
  },
  {
    id: "starter-thanjavur-paneer",
    slug: "thanjavur-royal-paneer",
    name: "Thanjavur Royal Paneer",
    category: "Signature Starters",
    description: "Tandoori paneer marinated in stone-ground royal spices, yogurt, and cold-pressed mustard oil.",
    story: "Creamy artisanal paneer cubes charred delicately in the tandoor with aromatic delta spices.",
    pricePaise: 23000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 1,
    tags: ["Tandoori", "Artisanal Paneer", "Royal"]
  },
  {
    id: "starter-malli-poo-mushroom",
    slug: "malli-poo-mushroom",
    name: "Malli Poo Mushroom",
    category: "Signature Starters",
    description: "Crispy mushroom with herbs, tossed in ground coriander seeds, pepper, and garlic crisps.",
    story: "Fresh button mushrooms coated in fragrant herbs and flashed in high heat for supreme crunch.",
    pricePaise: 20000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 1,
    tags: ["Crispy Mushroom", "Herbal", "Vegetarian"]
  },
  {
    id: "starter-karuveppilai-crunch",
    slug: "karuveppilai-crunch",
    name: "Karuveppilai Crunch",
    category: "Signature Starters",
    description: "Curry-leaf crispy chicken marinated in emerald curry leaf pesto and spiced gram flour.",
    story: "A culinary celebration of farm-fresh curry leaves providing unmatched herbal fragrance and crunch.",
    pricePaise: 27000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Curry Leaf Crust", "Emerald Spice", "Crunchy"]
  },
  {
    id: "starter-thattu-kada-65",
    slug: "thattu-kada-chicken-65",
    name: "Thattu Kada Chicken 65",
    category: "Signature Starters",
    description: "Street-style chicken 65 deep-fried with ginger-garlic crust, yogurt marinade, and dry chili spikes.",
    story: "The iconic South Indian highway stall chicken 65 with a punch of lemon and crisp fried chilies.",
    pricePaise: 24000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 2,
    tags: ["Classic 65", "Street Style", "Highway Dhaba"]
  },
  {
    id: "starter-golden-gobi",
    slug: "golden-gobi-explosion",
    name: "Golden Gobi Explosion",
    category: "Signature Starters",
    description: "Crispy cauliflower florets tossed in zesty garlic sauce, spring onions, and cracked pepper.",
    story: "Tender cauliflower florets crisped to perfection and glazed in a spicy sweet glaze.",
    pricePaise: 19000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 1,
    tags: ["Crispy Gobi", "Vegetarian", "Crowd Favourite"]
  },
  {
    id: "starter-pattasu-paneer",
    slug: "pattasu-paneer",
    name: "Pattasu Paneer",
    category: "Signature Starters",
    description: "Fiery chilli paneer tossed with spicy birds-eye chili paste, shallots, and capsicum shreds.",
    story: "Named after Tamil cracker celebrations, this dish packs a vibrant firecracker burst of chili heat.",
    pricePaise: 22000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    tags: ["Fiery Chilli", "Paneer Special", "Spicy Burst"]
  },

  // ===========================================================================
  // 3. SIGNATURE NON-VEG (PDF Page 2)
  // ===========================================================================
  {
    id: "nonveg-chettinad-flame",
    slug: "chettinad-flame-chicken",
    name: "Chettinad Flame Chicken",
    category: "Signature Non-Veg",
    description: "Chettinad-style spicy chicken slow-cooked with roasted kalpasi (stone flower), star anise, and fresh coconut.",
    story: "Handcrafted using the authentic 18-spice Chettinad masala blend roasted on slow cast iron.",
    pricePaise: 29000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Chettinad 18-Spice", "Stone Flower", "Signature"]
  },
  {
    id: "nonveg-kongu-kozhi-kari",
    slug: "kongu-kozhi-kari",
    name: "Kongu Kozhi Kari",
    category: "Signature Non-Veg",
    description: "Kongu-style chicken curry infused with shallot paste, tender coconut milk, and fragrant fennel seeds.",
    story: "A rustic village recipe from western Tamil Nadu known for light, soothing coconut richness.",
    pricePaise: 28000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    tags: ["Kongu Homeland", "Coconut Curry", "Homestyle"]
  },
  {
    id: "nonveg-erode-pepper-mutton",
    slug: "erode-pepper-mutton",
    name: "Erode Pepper Mutton",
    category: "Signature Non-Veg",
    description: "Erode-style pepper mutton braised tender in heavy brass handi with Tellicherry black pepper.",
    story: "Succulent goat meat braised until fork-tender in caramelized onion and peppery reduction.",
    pricePaise: 36000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Tender Mutton", "Erode Spice", "Pepper Braised"]
  },
  {
    id: "nonveg-mutton-sukka-mass",
    slug: "mutton-sukka-mass",
    name: "Mutton Sukka Mass",
    category: "Signature Non-Veg",
    description: "Tamil-style dry mutton pan-roasted with curry leaves, garlic cloves, and toasted coconut flakes.",
    story: "Slow dry-roasted on the tawa until every spice adheres tightly to tender chunks of mutton.",
    pricePaise: 38000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Dry Roast", "Sukka Special", "Meat Lovers"]
  },
  {
    id: "nonveg-nellai-nattu-kozhi",
    slug: "nellai-nattu-kozhi",
    name: "Nellai Nattu Kozhi",
    category: "Signature Non-Veg",
    description: "Country chicken curry cooked in Tirunelveli style with country garlic, poppy seeds, and red chili.",
    story: "Free-range country chicken cooked down in a deep red, fiery homestyle country gravy.",
    pricePaise: 32000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    tags: ["Country Chicken", "Nellai Style", "Homestyle Gravy"]
  },
  {
    id: "nonveg-chennai-marina-fish",
    slug: "chennai-marina-fish-fry",
    name: "Chennai Marina Fish Fry",
    category: "Signature Non-Veg",
    description: "Crispy masala fish steaks marinated in ginger, tamarind pulp, and crushed red chilies, shallow-fried on flat tawa.",
    story: "Fresh coastal catch seasoned with Marina Beach's legendary evening fish fry secret masala.",
    pricePaise: 30000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Fresh Catch", "Marina Beach", "Tawa Fried"]
  },
  {
    id: "nonveg-coastal-prawn-fire",
    slug: "coastal-prawn-fire",
    name: "Coastal Prawn Fire",
    category: "Signature Non-Veg",
    description: "Spicy prawn roast sautéed with whole shallots, cracked black pepper, and curry leaves in gingelly oil.",
    story: "Juicy bay prawns flash-sautéed in cold-pressed sesame oil with pungent coastal spices.",
    pricePaise: 36000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    tags: ["Juicy Prawns", "Coastal Fire", "Pepper Toss"]
  },
  {
    id: "nonveg-karaikudi-king-prawn",
    slug: "karaikudi-king-prawn",
    name: "Karaikudi King Prawn",
    category: "Signature Non-Veg",
    description: "Chettinad-style prawns simmered in stone-ground coconut, shallot paste, and aromatic maratti mokku.",
    story: "A regal Chettinad feast preparation with plump tiger prawns bathed in rich roasted masala.",
    pricePaise: 39000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["King Prawns", "Chettinad Royal", "Seafood Special"]
  },

  // ===========================================================================
  // 4. BIRYANI & RICE (PDF Page 3)
  // ===========================================================================
  {
    id: "biryani-hyderabad-crown",
    slug: "hyderabad-dum-crown",
    name: "Hyderabad Dum Crown",
    category: "Biryani & Rice",
    description: "Hyderabadi chicken biryani layered with long-grain basmati rice, saffron milk, and marinated chicken.",
    story: "Sealed with dough in heavy degchi and slow-cooked over glowing coals for regal fragrance.",
    pricePaise: 28000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Dum Pukht", "Basmati", "Saffron Fragrant"]
  },
  {
    id: "biryani-ambur-royal",
    slug: "ambur-royal-biryani",
    name: "Ambur Royal Biryani",
    category: "Biryani & Rice",
    description: "Ambur-style chicken biryani made with fragrant Seeraga Samba rice and dried curd chili paste.",
    story: "The legendary Arcot royal preparation crafted with tiny pearls of native Seeraga Samba rice.",
    pricePaise: 27000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Seeraga Samba", "Ambur Heritage", "Pure Ghee"]
  },
  {
    id: "biryani-dindigul-thalappakatti",
    slug: "dindigul-thalappakatti-style",
    name: "Dindigul Thalappakatti Style",
    category: "Biryani & Rice",
    description: "Dindigul-style mutton biryani cooked with tender young mutton, stone-crushed garlic, and pepper Samba rice.",
    story: "Dark, robust, and peppery, celebrated throughout Tamil Nadu for its deep meaty broth infusion.",
    pricePaise: 38000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Tender Mutton", "Dindigul Legend", "Seeraga Samba"]
  },
  {
    id: "biryani-kongu-mutton",
    slug: "kongu-mutton-biryani",
    name: "Kongu Mutton Biryani",
    category: "Biryani & Rice",
    description: "Kongu-style mutton biryani flavored with mild spices, shallot paste, and native country ghee.",
    story: "Subtle, aromatic, and easy on the stomach, cooked with farm-raised country mutton.",
    pricePaise: 39000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 2,
    tags: ["Kongu Style", "Farm Mutton", "Aromatic"]
  },
  {
    id: "biryani-nawabi-chicken",
    slug: "nawabi-chicken-biryani",
    name: "Nawabi Chicken Biryani",
    category: "Biryani & Rice",
    description: "Royal-style chicken biryani layered with fried cashews, golden raisins, and rich rose water.",
    story: "Rich, mildly spiced banquet biryani inspired by the kitchens of the Nawabs of Arcot.",
    pricePaise: 32000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 1,
    tags: ["Nawabi Royal", "Cashew Raisin", "Mild Aroma"]
  },
  {
    id: "biryani-prawn-pearl",
    slug: "prawn-pearl-biryani",
    name: "Prawn Pearl Biryani",
    category: "Biryani & Rice",
    description: "Aromatic prawn biryani cooked with delicate Seeraga Samba rice, coastal spices, and fresh mint leaves.",
    story: "Each grain of rice absorbs the sweet nectar of fresh prawns and stone-ground mint masala.",
    pricePaise: 40000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Seafood Biryani", "Juicy Prawns", "Chef Signature"]
  },
  {
    id: "rice-karuveppilai-chicken",
    slug: "karuveppilai-chicken-rice",
    name: "Karuveppilai Chicken Rice",
    category: "Biryani & Rice",
    description: "Curry-leaf chicken rice tossed with roasted curry leaf podi, tender chicken cubes, and ghee.",
    story: "Homestyle comfort bowl bursting with the antioxidant richness of dark green curry leaf podi.",
    pricePaise: 25000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 2,
    tags: ["Curry Leaf Rice", "Country Ghee", "Comfort Meal"]
  },
  {
    id: "rice-dragon-wok-chicken",
    slug: "dragon-wok-chicken-rice",
    name: "Dragon Wok Chicken Rice",
    category: "Biryani & Rice",
    description: "Spicy Asian fried rice fired in a screaming-hot iron wok with shredded chicken, chili oil, and scallions.",
    story: "High-flame wok toss that imparts irresistible wok-hei char and bold spicy chili flavor.",
    pricePaise: 26000,
    vegetarian: false,
    available: true,
    image: "/images/biryani-royal.jpg",
    spiceLevel: 3,
    tags: ["Wok Tossed", "Fiery Asian", "Street Style"]
  },

  // ===========================================================================
  // 5. SOUTH INDIAN SPECIALS (PDF Page 4)
  // ===========================================================================
  {
    id: "special-aachi-veetu-chicken",
    slug: "aachi-veetu-chicken-kuzhambu",
    name: "Aachi Veetu Chicken Kuzhambu",
    category: "South Indian Specials",
    description: "Traditional Tamil chicken curry brewed with freshly roasted coriander, cumin, and coconut paste.",
    story: "Grandmother's Sunday feast recipe simmered in earthen pots until the oil surfaces gently.",
    pricePaise: 28000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Grandmother Recipe", "Village Kuzhambu", "Homestyle"]
  },
  {
    id: "special-paati-veetu-mutton",
    slug: "paati-veetu-mutton-kuzhambu",
    name: "Paati Veetu Mutton Kuzhambu",
    category: "South Indian Specials",
    description: "Homestyle mutton curry cooked with bone marrow chunks, shallots, and hand-ground masala.",
    story: "Simmered low and slow for hours, yielding a deep, gelatinous gravy that pairs heavenly with rice.",
    pricePaise: 35000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Bone Marrow", "Mutton Gravy", "Sunday Feast"]
  },
  {
    id: "special-erode-style-mutton",
    slug: "erode-style-mutton-kuzhambu",
    name: "Erode Style Mutton Kuzhambu",
    category: "South Indian Specials",
    description: "Kongu/Erode-style mutton gravy with shallots, crushed ginger-garlic, and country chili powder.",
    story: "Native to the banks of the Bhavani river, celebrated for its clean, spicy turmeric-infused broth.",
    pricePaise: 36000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    tags: ["Erode Heritage", "Bhavani River", "Spicy Gravy"]
  },
  {
    id: "special-kongu-naatu-kozhi",
    slug: "kongu-naatu-kozhi-kuzhambu",
    name: "Kongu Naatu Kozhi Kuzhambu",
    category: "South Indian Specials",
    description: "Traditional country chicken gravy prepared with cold-pressed sesame oil, shallots, and black pepper.",
    story: "Rustic village recipe packed with the deep earthy flavor of free-range country chicken.",
    pricePaise: 32000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    tags: ["Country Chicken", "Sesame Oil", "Village Gravy"]
  },
  {
    id: "special-chettinad-pepper-chicken",
    slug: "chettinad-pepper-chicken",
    name: "Chettinad Pepper Chicken",
    category: "South Indian Specials",
    description: "Pepper-rich Chettinad chicken curry cooked with Tellicherry black peppercorns and fennel seeds.",
    story: "A spicy signature from the merchant mansions of Chettinad, aromatic and invigorating.",
    pricePaise: 29000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 3,
    tags: ["Black Pepper", "Chettinad Heritage", "Invigorating"]
  },
  {
    id: "special-madurai-kari-varuval",
    slug: "madurai-kari-varuval",
    name: "Madurai Kari Varuval",
    category: "South Indian Specials",
    description: "Spicy mutton fry pan-roasted with hand-pounded red chilies, shallots, and fresh curry leaves.",
    story: "The quintessential Madurai military mess preparation with dark roasted edges and melt-in-mouth meat.",
    pricePaise: 37000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Military Mess", "Madurai Style", "Varuval Special"]
  },
  {
    id: "special-namma-ooru-sukka",
    slug: "namma-ooru-chicken-sukka",
    name: "Namma Ooru Chicken Sukka",
    category: "South Indian Specials",
    description: "Tamil-style dry chicken pan-roasted with freshly grated coconut, fennel, and dried red chilies.",
    story: "Comforting dry roast featuring the subtle sweetness of roasted coconut balancing fiery chilies.",
    pricePaise: 28000,
    vegetarian: false,
    available: true,
    image: "/images/starters-madurai.jpg",
    spiceLevel: 2,
    tags: ["Coconut Roast", "Tamil Style", "Tawa Sukka"]
  },

  // ===========================================================================
  // 6. MODERN FUSION (PDF Page 5)
  // ===========================================================================
  {
    id: "fusion-tandoori-pizza",
    slug: "tandoori-chicken-blast-pizza",
    name: "Tandoori Chicken Blast Pizza",
    category: "Modern Fusion",
    description: "Tandoori chicken pizza topped with clay-oven charred chicken, mozzarella, bell peppers, and mint chutney swirl.",
    story: "Hand-stretched sourdough crust fired to bubbly perfection and crowned with smoky tandoori chicken.",
    pricePaise: 38000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Hand Stretched", "Smoky Tandoori", "Artisan Mozzarella"]
  },
  {
    id: "fusion-chettinad-pizza",
    slug: "chettinad-chicken-pizza",
    name: "Chettinad Chicken Pizza",
    category: "Modern Fusion",
    description: "Chettinad-spiced chicken pizza topped with 18-spice shredded chicken, pickled shallots, and stringy cheese.",
    story: "A thrilling east-meets-west creation combining Italian baking tradition with Chettinad spice mastery.",
    pricePaise: 39000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    bestseller: true,
    tags: ["Chettinad Fusion", "Artisan Crust", "Chef Innovation"]
  },
  {
    id: "fusion-kari-cheese-melt",
    slug: "kari-cheese-melt",
    name: "Kari Cheese Melt",
    category: "Modern Fusion",
    description: "Spicy minced-meat cheesy pizza baked with spiced mutton keema, melted cheddar, and jalapeños.",
    story: "Rich minced mutton cooked with traditional aromatics and draped under golden bubbling cheese.",
    pricePaise: 42000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 2,
    tags: ["Mutton Keema", "Cheese Melt", "Decadent"]
  },
  {
    id: "fusion-desi-alfredo",
    slug: "desi-alfredo-chicken",
    name: "Desi Alfredo Chicken",
    category: "Modern Fusion",
    description: "Creamy Indian-style pasta tossed in garlic parmesan cream with tikka-seasoned chicken slices.",
    story: "Al dente penne bathed in silky white sauce enriched with toasted cumin and crushed black pepper.",
    pricePaise: 33000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 1,
    tags: ["Creamy Alfredo", "Desi Twist", "Al Dente"]
  },
  {
    id: "fusion-pattasu-pasta",
    slug: "pattasu-pasta",
    name: "Pattasu Pasta",
    category: "Modern Fusion",
    description: "Spicy Indian fusion pasta tossed in arrabbiata sauce with fiery birds-eye chilies, garlic, and fresh herbs.",
    story: "Fiery red fusion penne pasta packed with South Indian chili heat and fresh Italian basil.",
    pricePaise: 28000,
    vegetarian: true,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 3,
    tags: ["Fiery Arrabbiata", "Vegetarian", "Fusion Fire"]
  },
  {
    id: "fusion-makhani-lasagna",
    slug: "makhani-chicken-lasagna",
    name: "Makhani Chicken Lasagna",
    category: "Modern Fusion",
    description: "Butter-chicken inspired lasagna layered with spiced tomato-butter gravy, tender chicken, and ricotta.",
    story: "Layers of delicate pasta sheets baked with rich Makhani sauce, mozzarella, and Kasuri methi.",
    pricePaise: 42000,
    vegetarian: false,
    available: true,
    image: "/images/specials-south-indian.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Butter Chicken", "Baked Lasagna", "Signature Melt"]
  },

  // ===========================================================================
  // 7. MOCKTAILS (PDF Page 6)
  // ===========================================================================
  {
    id: "mocktail-chennai-sunset",
    slug: "chennai-sunset",
    name: "Chennai Sunset",
    category: "Mocktails",
    description: "Layered citrus sunrise with blood orange, sweet lime, and fresh garden mint over crushed ice.",
    story: "Inspired by the crimson glow over the Bay of Bengal at twilight.",
    pricePaise: 15000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Citrus", "Refreshing", "Sunset Blend"]
  },
  {
    id: "mocktail-kovai-cool-breeze",
    slug: "kovai-cool-breeze",
    name: "Kovai Cool Breeze",
    category: "Mocktails",
    description: "Crisp cucumber cooler with crushed mint, lemon zest, and chia seeds.",
    story: "Cooling revitalizer echoing the gentle evening breezes from the Western Ghats.",
    pricePaise: 14000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    tags: ["Cucumber Cooler", "Hydrating", "Chia Seeds"]
  },
  {
    id: "mocktail-mango-thendral",
    slug: "mango-thendral",
    name: "Mango Thendral",
    category: "Mocktails",
    description: "Alphonso mango nectar shaken with roasted cumin and sparkling soda.",
    story: "Sun-drenched Salem mangoes balanced with aromatic toasted cumin and fizzy effervescence.",
    pricePaise: 15000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Salem Mango", "Sparkling Soda", "Summer Classic"]
  },
  {
    id: "mocktail-nannari-fizz",
    slug: "nannari-fizz",
    name: "Nannari Fizz",
    category: "Mocktails",
    description: "Traditional sarsaparilla root syrup with crushed ice, fresh lime, and bubbling soda.",
    story: "South India's heritage herbal cooler, beloved for its deep woody sweetness and body-cooling magic.",
    pricePaise: 13000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Nannari Root", "Heritage Drink", "Body Cooler"],
    healthBenefits: "Natural Ayurvedic coolant that revitalizes hydration and soothes heat."
  },
  {
    id: "mocktail-elaneer-mojito",
    slug: "elaneer-mojito",
    name: "Elaneer Mojito",
    category: "Mocktails",
    description: "Tender coconut water muddled with fresh mint, lime juice, and tender malai strips.",
    story: "Fresh tender coconut harvested from Pollachi groves, muddled fresh with mint and crushed ice.",
    pricePaise: 16000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Pollachi Coconut", "Fresh Mint", "Signature Cooler"],
    healthBenefits: "Pure electrolyte replenishment with potassium and natural antioxidants."
  },
  {
    id: "mocktail-rose-milk-royale",
    slug: "rose-milk-royale",
    name: "Rose Milk Royale",
    category: "Mocktails",
    description: "Chilled country milk infused with Damascus rose petals, basil seeds, and pistachio crumbs.",
    story: "Madurai's nostalgic festive rose milk elevated with authentic Damascus rose essence.",
    pricePaise: 15000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    tags: ["Rose Essence", "Country Milk", "Festive Favorite"]
  },
  {
    id: "mocktail-pudhuvai-blue-lagoon",
    slug: "pudhuvai-blue-lagoon",
    name: "Pudhuvai Blue Lagoon",
    category: "Mocktails",
    description: "Curacao citrus mocktail with kaffir lime and sparkling tonic water.",
    story: "A French-colonial inspired seaside refresher reminiscent of Pondicherry's promenade.",
    pricePaise: 17000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    tags: ["Blue Lagoon", "Pondicherry Breeze", "Citrus Sparkle"]
  },
  {
    id: "mocktail-passion-fruit-pattasu",
    slug: "passion-fruit-pattasu",
    name: "Passion Fruit Pattasu",
    category: "Mocktails",
    description: "Tangy tropical passion fruit with a fiery hint of bird's eye chili and fresh ginger.",
    story: "An electrifying mocktail that pairs tropical sweetness with a tongue-tingling chili kick.",
    pricePaise: 18000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 2,
    bestseller: true,
    tags: ["Passion Fruit", "Chili Zing", "Exotic Refreshment"]
  },

  // ===========================================================================
  // 8. DESSERTS (PDF Page 7)
  // ===========================================================================
  {
    id: "dessert-paatis-paal-payasam",
    slug: "paatis-paal-payasam",
    name: "Paati's Paal Payasam",
    category: "Desserts",
    description: "Traditional milk payasam slow-simmered with broken rice, milk, and cardamom in heavy bronze pot.",
    story: "Slow-simmered for four hours until the milk turns into a rich, naturally pinkish ambrosia.",
    pricePaise: 14000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Temple Recipe", "Slow Simmered", "Pure Milk"]
  },
  {
    id: "dessert-thanjavur-royal-payasam",
    slug: "thanjavur-royal-payasam",
    name: "Thanjavur Royal Payasam",
    category: "Desserts",
    description: "Rich traditional payasam with roasted moong dal, native jaggery, pure ghee, and coconut slivers.",
    story: "The revered Paruppu Payasam of Thanjavur palaces, sweetened exclusively with organic jaggery.",
    pricePaise: 16000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    tags: ["Organic Jaggery", "Royal Delta", "Moong Dal"]
  },
  {
    id: "dessert-hot-lava-dream",
    slug: "hot-lava-dream",
    name: "Hot Lava Dream",
    category: "Desserts",
    description: "Chocolate lava cake with molten chocolate center, served with cold vanilla bean cream.",
    story: "Warm, decadent dark chocolate cake that flows with rich molten chocolate at first spoon.",
    pricePaise: 21000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Molten Chocolate", "Warm Lava", "Decadent"]
  },
  {
    id: "dessert-madurai-jigarthanda-royale",
    slug: "madurai-jigarthanda-royale",
    name: "Madurai Jigarthanda Royale",
    category: "Desserts",
    description: "Rich jigarthanda layered with almond gum (badam pisin), nannari root syrup, condensed milk, and basundi ice cream.",
    story: "The iconic royal heart-cooler of Madurai, crafted authentically without shortcuts.",
    pricePaise: 18000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Madurai Heritage", "Badam Pisin", "Basundi Royale"],
    healthBenefits: "Badam pisin provides natural gut cooling and body revitalization."
  },
  {
    id: "dessert-kovilpatti-chocolate-halwa",
    slug: "kovilpatti-chocolate-halwa",
    name: "Kovilpatti Chocolate Halwa",
    category: "Desserts",
    description: "Chocolate halwa fusion slow-cooked with wheat milk, pure ghee, cocoa, and crunchy cashews.",
    story: "A delightful fusion of South Tamil Nadu's wheat halwa mastery and rich Belgian cocoa.",
    pricePaise: 16000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    tags: ["Halwa Fusion", "Pure Ghee", "Wheat Milk"]
  },
  {
    id: "dessert-brownie-thunder",
    slug: "brownie-thunder",
    name: "Brownie Thunder",
    category: "Desserts",
    description: "Fudgy brownie with ice cream, warm chocolate drizzle, and roasted cashew sprinkles.",
    story: "Sizzling walnut chocolate brownie paired with rich country cream ice cream.",
    pricePaise: 20000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Fudge Brownie", "Ice Cream", "All-Time Favourite"]
  },
  {
    id: "dessert-mango-thendral-cream",
    slug: "mango-thendral-cream",
    name: "Mango Thendral Cream",
    category: "Desserts",
    description: "Mango cream dessert layered with Salem Alphonso puree, whipped mascarpone, and pistachio praline.",
    story: "Silky, velvety mango delight capturing the sweetness of peak season South Indian mangoes.",
    pricePaise: 18000,
    vegetarian: true,
    available: true,
    image: "/images/hero-feast.jpg",
    spiceLevel: 1,
    tags: ["Alphonso Mango", "Whipped Cream", "Seasonal Luxury"]
  },
  {
    id: "dessert-royal-falooda-mahal",
    slug: "royal-falooda-mahal",
    name: "Royal Falooda Mahal",
    category: "Desserts",
    description: "Loaded royal falooda with rose syrup, vermicelli, sabja seeds, mixed nuts, and double scoop ice cream.",
    story: "A majestic dessert tower layered with textures, aroma, and rich condensed milk.",
    pricePaise: 22000,
    vegetarian: true,
    available: true,
    image: "/images/drinks-mocktails.jpg",
    spiceLevel: 1,
    bestseller: true,
    tags: ["Loaded Falooda", "Double Scoop", "Banquet Special"]
  }
];

export const categories: MenuCategory[] = [
  "Digest & Eat",
  "Signature Starters",
  "Signature Non-Veg",
  "Biryani & Rice",
  "South Indian Specials",
  "Modern Fusion",
  "Mocktails",
  "Desserts"
];

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