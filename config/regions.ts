export type VeinSlug =
  | "mediterranean"
  | "latin-america"
  | "japan"
  | "moghul-court"
  | "silk-road"
  | "west-africa"
  | "northern-hearth"
  | "southeast-asia";

export interface Vein {
  slug: VeinSlug;
  name: string;
  archetype: string;
  oneLiner: string;
}

export interface Region {
  slug: string;
  name: string;
  country: string;
  geo: { lat: number; lng: number };
  vein: VeinSlug;
  /** Optional per-region archetype override; defaults to the vein archetype. */
  archetype?: string;
  tagline: string;
  description: string;
  origin: string;
  transformation: string;
  recognition: string;
  specialties: string[];
  trinity: [string, string, string];
  atoll: { x: number; y: number };
}

export const VEINS: Vein[] = [
  {
    slug: "mediterranean",
    name: "The Mediterranean Basin",
    archetype: "The Oldest Table",
    oneLiner: "Olive, wheat and grape — three crops that shaped a civilization.",
  },
  {
    slug: "latin-america",
    name: "Latin & Iberian America",
    archetype: "Spice Meets Smoke",
    oneLiner: "The tandem of maize and chile, carried by migration and ocean.",
  },
  {
    slug: "japan",
    name: "The Japanese Archipelago",
    archetype: "Ferment & Umami",
    oneLiner: "Patience, season and restraint make simplicity profound.",
  },
  {
    slug: "moghul-court",
    name: "The Moghul Court",
    archetype: "The Spice Archive",
    oneLiner: "Court kitchens where spice became ceremony and slow heat became craft.",
  },
  {
    slug: "silk-road",
    name: "Silk Road Crossroads",
    archetype: "The Exchange",
    oneLiner: "Ports and passes where every caravan rewrote the local plate.",
  },
  {
    slug: "west-africa",
    name: "The West African Hearth",
    archetype: "Fire & Grain",
    oneLiner: "Fermentation, pounding and flame built a vast one-pot grammar.",
  },
  {
    slug: "northern-hearth",
    name: "The Northern Hearth",
    archetype: "Fireside Baking",
    oneLiner: "Inland valleys where butter, dough and long cooking rule.",
  },
  {
    slug: "southeast-asia",
    name: "The Southeast Archipelago",
    archetype: "The Island Trade",
    oneLiner: "River, sea and spice routes collided into bold, layered food.",
  },
];

export const REGIONS: Region[] = [
  {
    slug: "naples",
    name: "Naples",
    country: "Italy",
    geo: { lat: 40.8518, lng: 14.2681 },
    vein: "mediterranean",
    tagline: "The pizza cradle",
    description:
      "A port city that turned flatbread into a global dispatches. Naples defends its dough, its oven, and its patience.",
    origin: "Flatbreads existed for centuries, but the modern pizza — baked in Naples' wood ovens with tomato — emerges in the 1700s from the city's working-class streets.",
    transformation: "Tomatoes, dismissed in Europe for centuries, found their true partner in Neapolitan dough. Pizzaioli turned a street food into a craft guild craft.",
    recognition: "UNESCO inscribed the art of the Neapolitan pizzaiuolo on the Intangible Cultural Heritage list in 2017.",
    specialties: ["Pizza Margharita", "Calzone", "Pastiera"],
    trinity: ["Wheat flour", "San Marzano tomato", "Mozzarella"],
    atoll: { x: 20, y: 38 },
  },
  {
    slug: "marseille",
    name: "Marseille",
    country: "France",
    geo: { lat: 43.2965, lng: 5.3698 },
    vein: "mediterranean",
    archetype: "The Oldest Table",
    tagline: "Gate to the Mediterranean",
    description: "France's oldest city, founded by Greek sailors, blends Provençal land and sea on a single plate.",
    origin: "Founded as a Greek colony around 600 BC, Marseille carried the Mediterranean trade table before France existed.",
    transformation: "The city's harbor cuisine — bouillabaisse and the aioli table — codified the marriage of fish, olive oil and saffron.",
    recognition: "A UNESCO Creative City of Gastronomy since 2015, grounded in the region's identity.",
    specialties: ["Bouillabaisse", "Aïoli", "Socca"],
    trinity: ["Olive oil", "Saffron", "Rascasse fish"],
    atoll: { x: 18, y: 36 },
  },
  {
    slug: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    geo: { lat: 19.4326, lng: -99.1332 },
    vein: "latin-america",
    archetype: "Spice Meets Smoke",
    tagline: "Maize was the city",
    description: "Built on a lake and on corn. Mexico-Tenochtitlan's markets still set the rhythm of the world's most layered snack culture.",
    origin: "The Mexica capital's famous markets were organized by food, from cacao to squash, centuries before the Spanish arrived.",
    transformation: "Nixtamalization already made maize edible and nutritious; the colonial era added cattle, wheat and pork to an existing genius.",
    recognition: "Maize, nixtamalization and the taco are UNESCO-acknowledged cultural touchstones of Mesoamerica.",
    specialties: ["Tacos al pastor", "Tamales", "Mole"],
    trinity: ["Maize", "Chile", "Epazote"],
    atoll: { x: 12, y: 26 },
  },
  {
    slug: "lima",
    name: "Lima",
    country: "Peru",
    geo: { lat: -12.0464, lng: -77.0428 },
    vein: "latin-america",
    archetype: "Spice Meets Smoke",
    tagline: "The kitchen of the Pacific",
    description: "A coastal meeting point of Andean, Pacific, Asian and West African kitchens that refuses to stay still.",
    origin: "Pre-Hispanic coastal people cured fish with the acids of local fruit — a raw ancestor of ceviche.",
    transformation: "Migrations from Japan, China and West Africa sharpened the technique; postwar kitchens fused them into a national cuisine.",
    recognition: "Peru's food scene earned Lima repeated 'world's best dining destination' honors from global culinary polls in the 2010s.",
    specialties: ["Ceviche", "Lomo saltado", "Causa"],
    trinity: ["Ají amarillo", "Lime", "Cilantro"],
    atoll: { x: 9, y: 47 },
  },
  {
    slug: "tokyo",
    name: "Tokyo",
    country: "Japan",
    geo: { lat: 35.6762, lng: 139.6503 },
    vein: "japan",
    archetype: "Ferment & Umami",
    tagline: "Edo's hand-pressed world",
    description: "From Edo-period street stalls to the omakase counter, Tokyo refined nigiri into a ritual of season and time.",
    origin: "Edo (Tokyo) street food culture thrived in the 19th century: late-night stalls sold hand-pressed sushi as fast food.",
    transformation: "Electricity, ice and refrigeration let chefs ship and hold daily fish — turning perishability into an artisan advantage.",
    recognition: "Tokyo led the world's Michelin-star totals for over a decade, a record repeatedly cited from the 2010s onward.",
    specialties: ["Nigiri omakase", "Ramen", "Yakitori"],
    trinity: ["Shoyu", "Kombu", "Day-old fish"],
    atoll: { x: 82, y: 40 },
  },
  {
    slug: "kyoto",
    name: "Kyoto",
    country: "Japan",
    geo: { lat: 35.0116, lng: 135.7681 },
    vein: "japan",
    archetype: "Ferment & Umami",
    tagline: "The imperial palate",
    description: "A thousand years of temple food and imperial restraint distilled into kaiseki's precise seasonal course.",
    origin: "Kyoto's imperial court and Zen temples shaped a disciplined, vegetable-forward Buddhist cooking called shōjin ryori.",
    transformation: "That discipline flowed into kaiseki — a sequence of seasonal courses where presentation is as eaten as the food.",
    recognition: "Kaiseki is recognized globally as a pinnacle of haute cuisine, tied to Kyoto's tea ceremony heritage.",
    specialties: ["Kaiseki", "Shōjin ryori", "Yudofu"],
    trinity: ["Tofu", "Miso", "Kuzu"],
    atoll: { x: 80, y: 42 },
  },
  {
    slug: "lucknow",
    name: "Lucknow",
    country: "India",
    geo: { lat: 26.8467, lng: 80.9462 },
    vein: "moghul-court",
    archetype: "The Spice Archive",
    tagline: "Avadh's slow court",
    description: "The courts of Avadh refined patience cooking — dum — where flavor is sealed in and revealed at the table.",
    origin: "The Avadh court kitchens developed in the Mughal world, centered on nawabi ceremony and refined spice blends.",
    transformation: "Dum pukht — cooking under a sealed lid with a low flame — turned everyday patience into a royal technique.",
    recognition: "Lucknow's kebabs and biryani remain among India's most celebrated culinary exports, cited in food writing worldwide.",
    specialties: ["Mutton biryani", "Galouti kebab", "Kakori kebab"],
    trinity: ["Kewra water", "Mace", "Coal smoke"],
    atoll: { x: 70, y: 30 },
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    country: "India",
    geo: { lat: 17.385, lng: 78.4867 },
    vein: "moghul-court",
    archetype: "The Spice Archive",
    tagline: "Pearls and biryani",
    description: "Qutb Shahi and Nizam kitchens fused Persian technique with Deccan produce into India's regal biryani.",
    origin: "Deccan courts absorbed Persian court cooks from the 16th century, blending saffron and rose with local rice and lamb.",
    transformation: "The layering of raw rice and meat, then steaming in a sealed pot, gave Hyderabad its hallmarked biryani.",
    recognition: "Hyderabadi biryani is consistently ranked among the world's most celebrated rice dishes in global food media.",
    specialties: ["Hyderabadi biryani", "Haleem", "Double ka meetha"],
    trinity: ["Basmati", "Saffron", "Lamb"],
    atoll: { x: 72, y: 33 },
  },
  {
    slug: "istanbul",
    name: "Istanbul",
    country: "Türkiye",
    geo: { lat: 41.0082, lng: 28.9784 },
    vein: "silk-road",
    archetype: "The Exchange",
    tagline: "Two continents, one table",
    description: "Byzantine and Ottoman palace kitchens fused into a street food empire at the hinge of two continents.",
    origin: "The Ottoman palace kitchens — feeding thousands daily — systematized a cuisine from the empire's full map.",
    transformation: "When palaces leaned back, the same cooks moved to the streets, where döner and meze conquered the city.",
    recognition: "Istanbul was named a UNESCO Creative City of Gastronomy in 2015 for its living food culture.",
    specialties: ["Döner kebab", "Meze", "Baklava"],
    trinity: ["Yogurt", "Sumac", "Lamb"],
    atoll: { x: 56, y: 36 },
  },
  {
    slug: "beirut",
    name: "Beirut",
    country: "Lebanon",
    geo: { lat: 33.8938, lng: 35.5018 },
    vein: "silk-road",
    archetype: "The Exchange",
    tagline: "The Levantine table",
    description: "A port city that treats a meal as a negotiation of small plates, generosity, and ancient pantry staples.",
    origin: "The Levant's table was set by shared staples — olive, wheat, yogurt — from ancient Phoenician ports.",
    transformation: "That pantry became the mezze system: many small plates, chosen and argued over, on a single shared table.",
    recognition: "Lebanese cuisine and the mezze tradition are widely recognized as defining the modern Levantine table.",
    specialties: ["Mezze", "Kibbeh", "Muhammara"],
    trinity: ["Olive oil", "Tahini", "Pomegranate"],
    atoll: { x: 58, y: 38 },
  },
  {
    slug: "ibadan",
    name: "Ibadan",
    country: "Nigeria",
    geo: { lat: 7.3775, lng: 3.947 },
    vein: "west-africa",
    archetype: "Fire & Grain",
    tagline: "The largest open pot",
    description: "West Africa's largest city by area cooks its history in one pot: smoked peppers, ground grain, patient flame.",
    origin: "Ibadan grew as a Yoruba commercial capital whose kitchens rested on fermented starches and fresh stews.",
    transformation: "The city's street barbecue and 'point and kill' grills turned a Friday evening into a ritual of fire and pepper.",
    recognition: "Nigerian pepper soup and jollof sit at the heart of ongoing West African food rivalry — a mark of pride.",
    specialties: ["Amala & ewedu", "Suya", "Jollof rice"],
    trinity: ["Palm oil", "Scotch bonnet", "Smoked fish"],
    atoll: { x: 30, y: 58 },
  },
  {
    slug: "accra",
    name: "Accra",
    country: "Ghana",
    geo: { lat: 5.6037, lng: -0.187 },
    vein: "west-africa",
    archetype: "Fire & Grain",
    tagline: "The grain that ferments",
    description: "Coastal Ga kitchens turned corn and cassava into a fermented daily staple and a national argument over jollof.",
    origin: "Ga coastal cooking built its meals on fermented maize dough — kenkey — pressed and wrapped in fresh leaves.",
    transformation: "Fermentation gave the region its low, sour, deeply satisfying daily starch, matched to groundnut soups.",
    recognition: "Accra's kenkey and its fierce jollof pride anchor Ghana's claim in West Africa's friendly food rivalry.",
    specialties: ["Kenkey", "Groundnut soup", "Kelewele"],
    trinity: ["Fermented corn", "Palm nut", "Groundnut"],
    atoll: { x: 28, y: 56 },
  },
  {
    slug: "bologna",
    name: "Bologna",
    country: "Italy",
    geo: { lat: 44.4949, lng: 11.3426 },
    vein: "northern-hearth",
    archetype: "Fireside Baking",
    tagline: "La grassa, the fat one",
    description: "An inland university city that codified ragù, tortellini and the world's most-praised cured meats.",
    origin: "Bologna's medieval guilds and the blessing of the Emilian plain's dairy and wheat built a rich, filling table.",
    transformation: "Its ragù — slowly coaxed meat — fled the city as 'bolognese' and conquered the world's pasta pots.",
    recognition: "Bolognese ragù is arguably the most imitated home recipe on Earth, cited by Italian food historians worldwide.",
    specialties: ["Tagliatelle al ragù", "Tortellini", "Mortadella"],
    trinity: ["Egg pasta", "Parmesan", "Cured pork"],
    atoll: { x: 22, y: 34 },
  },
  {
    slug: "lyon",
    name: "Lyon",
    country: "France",
    geo: { lat: 45.764, lng: 4.8357 },
    vein: "northern-hearth",
    archetype: "Fireside Baking",
    tagline: "The bouchon city",
    description: "Silk weavers invented rich, thrifty 'bouchon' food that France itself crowned its culinary capital.",
    origin: "Lyon's silk weavers — canuts — needed dense, affordable food; their small shops became the 'bouchon'.",
    transformation: "Mother cooks (mères) turned those casual tables into refined bistro classics, then launched Michelin-starred empire.",
    recognition: "Lyon is long cited — by figures such as Curnonsky — as the gastronomic capital of France.",
    specialties: ["Quenelle", "Salade lyonnaise", "Pistachio praline"],
    trinity: ["Cream", "Offal", "Wine"],
    atoll: { x: 19, y: 33 },
  },
  {
    slug: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    geo: { lat: 13.7563, lng: 100.5018 },
    vein: "southeast-asia",
    archetype: "The Island Trade",
    tagline: "The river that feeds",
    description: "A royal court tradition met river markets and the heat-strike of a street born on every corner.",
    origin: "Bangkok's royal courts refined Thai taste; Chinese traders added wok technique and noodles to the base.",
    transformation: "Fusion with the street produced the counter and wok canon known today as Thai food across the world.",
    recognition: "Bangkok ranks atop global street food capitals in travel polls, a title tied to its night markets and boat houses.",
    specialties: ["Pad thai", "Tom yum", "Som tam"],
    trinity: ["Palm sugar", "Fish sauce", "Thai chile"],
    atoll: { x: 77, y: 52 },
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    geo: { lat: 1.3521, lng: 103.8198 },
    vein: "southeast-asia",
    archetype: "The Island Trade",
    tagline: "The hawker republic",
    description: "A port colony raised on trade became the world's most organized food democracy: the hawker center.",
    origin: "Founded as a British trading post in 1819, Singapore's streets filled with Chinese, Malay and Indian hawker stalls.",
    transformation: "In 1971 the government moved street vendors into licensed hawker centers — turning chaos into a studied system.",
    recognition: "UNESCO listed Singapore's hawker culture as Intangible Cultural Heritage in 2020.",
    specialties: ["Chicken rice", "Hainanese", "Chilli crab"],
    trinity: ["Rice", "Soy", "Chilli"],
    atoll: { x: 79, y: 54 },
  },
];

export function getVein(slug: VeinSlug): Vein {
  return VEINS.find((vein) => vein.slug === slug) as Vein;
}

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((region) => region.slug === slug);
}

export function regionsByVein(vein: VeinSlug): Region[] {
  return REGIONS.filter((region) => region.vein === vein);
}