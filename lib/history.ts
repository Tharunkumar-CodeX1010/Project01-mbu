export interface FilmScene {
  scene: number;
  minutes: number;
  title: string;
  synopsis: string;
}

export interface HistoryFilm {
  slug: string;
  title: string;
  artefact: string;
  span: string;
  episodeMinutes: number;
  regions: string[];
  dishes: string[];
  timeline: Array<{ year: string; event: string }>;
  scenes: FilmScene[];
  provenance: string;
  poster: string;
}

export const HISTORY_FILMS: HistoryFilm[] = [
  {
    slug: "pizza-long-rise",
    title: "The Long Rise of Pizza",
    artefact: "Flatbread, tomato, oven",
    span: "1500s → 2017",
    episodeMinutes: 6,
    regions: ["naples", "bologna"],
    dishes: ["pizza-napoletana"],
    timeline: [
      { year: "15th c.", event: "Tomato arrives in Europe from the Americas, treated with suspicion." },
      { year: "1700s", event: "Naples' working streets bake flatbread with tomato as street food." },
      { year: "1889", event: "The color-of-Italy Margherita is named (tradition, not verified record)." },
      { year: "2017", event: "UNESCO inscribes the Neapolitan pizzaiuolo craft." },
    ],
    scenes: [
      { scene: 1, minutes: 1, title: "The suspicious fruit", synopsis: "Why Europe spent 200 years avoiding the tomato — and who finally trusted it." },
      { scene: 2, minutes: 2, title: "Cornicione and cinder", synopsis: "Naples' wood ovens, the cornicione rim, and street cooks who became a guild of craft." },
      { scene: 3, minutes: 2, title: "Three colors of a nation", synopsis: "How the Margherita's green-white-red became a flag on a plate." },
      { scene: 4, minutes: 1, title: "The world's most imitated dough", synopsis: "UNESCO 2017 and pizza's quiet conquest of every time zone." },
    ],
    provenance:
      "Compiled from public culinary histories and food-journalism accounts. No archival footage is embedded in this build; video is BLOCKED_EXTERNAL_DEPENDENCY until authorized media sources are configured.",
    poster: "/media/poster-history.svg",
  },
  {
    slug: "biryani-long-march",
    title: "Biryani's Long March",
    artefact: "Rice, saffron, steam",
    span: "1500s → present",
    episodeMinutes: 7,
    regions: ["lucknow", "hyderabad"],
    dishes: ["mutton-biryani", "hyderabadi-biryani"],
    timeline: [
      { year: "1500s", event: "Persian court cooks travel to Deccan courts with layered rice technique." },
      { year: "18th c.", event: "Avadh and Hyderabad refine dum (sealed-lid steaming) as court method." },
      { year: "20th c.", event: "Biryani leaves the court for weddings, tiffins and world steamers." },
      { year: "today", event: "Two great biryani schools — Lucknow's and Hyderabad's — dispute the crown daily." },
    ],
    scenes: [
      { scene: 1, minutes: 2, title: "From Persian gardens", synopsis: "The court kitchens that carried rice over the mountains into India." },
      { scene: 2, minutes: 2, title: "The sealed pot", synopsis: "Dum technique: why a lid and a low flame changed Indian cooking." },
      { scene: 3, minutes: 2, title: "Two crowns", synopsis: "Lucknow's kewra-forward style versus Hyderabad's saffron-and-rose intensity." },
      { scene: 4, minutes: 1, title: "A rice for the republic", synopsis: "How biryani became India's steam-table wedding and weekly comfort." },
    ],
    provenance:
      "Synthesized from court-history accounts and regional food writing. Video BLOCKED_EXTERNAL_DEPENDENCY; no archival footage embedded.",
    poster: "/media/poster-history.svg",
  },
  {
    slug: "ceviche-cold-cure",
    title: "The Cold Cure",
    artefact: "Fish, lime, fire of the sea",
    span: "Pre-Columbian → present",
    episodeMinutes: 5,
    regions: ["lima"],
    dishes: ["ceviche-clasico"],
    timeline: [
      { year: "Pre-1492", event: "Coastal peoples cure fish with local fruit acids." },
      { year: "20th c.", event: "Lime and the Japanese-immigrant precision of the knife settle the modern form." },
      { year: "today", event: "Ceviche is Peru's national calling card from Lima beaches to world menus." },
    ],
    scenes: [
      { scene: 1, minutes: 2, title: "Before the lime", synopsis: "The pre-Hispanic cures that cooked without fire." },
      { scene: 2, minutes: 2, title: "The sour arrival", synopsis: "Citrus replaces older acids, and the dish cures faster than any legend." },
      { scene: 3, minutes: 1, title: "The ocean taut", synopsis: "Why ceviche must be served instantly — and why that rule made it famous." },
    ],
    provenance:
      "Compiled from historical food writing; the earliest forms are asserted carefully as 'pre-Hispanic acid-curing traditions'. Video BLOCKED_EXTERNAL_DEPENDENCY.",
    poster: "/media/poster-history.svg",
  },
  {
    slug: "quiet-soup",
    title: "The Quiet Soup",
    artefact: "Kombu, katsuobushi, patience",
    span: "Heian era → 1908",
    episodeMinutes: 5,
    regions: ["tokyo", "kyoto"],
    dishes: ["kombu-dashi", "kaiseki-tasting"],
    timeline: [
      { year: "Heian", event: "Court taste prefers subtle, umami-forward broths over heavy seasoning." },
      { year: "1600s", event: "Shogunate-era kitchens steep kombu and smoke-cured skipjack for stock." },
      { year: "1908", event: "Ikeda names the taste 'umami' from kombu broth — a century before it goes mainstream." },
    ],
    scenes: [
      { scene: 1, minutes: 2, title: "Kombu's quiet decade", synopsis: "A kelp that gives, and gives, and then leaves." },
      { scene: 2, minutes: 2, title: "Smoke, fish, patience", synopsis: "Katsuobushi: how dried, fermented skipjack became the flavor-print of Japan." },
      { scene: 3, minutes: 1, title: "The word that changed menu-writing", synopsis: "1908 and the naming of umami." },
    ],
    provenance:
      "Public food-science and culinary-history sources. Video BLOCKED_EXTERNAL_DEPENDENCY.",
    poster: "/media/poster-history.svg",
  },
  {
    slug: "spit-across-the-sea",
    title: "The Spit That Crossed the Sea",
    artefact: "Marinated pork, trompo, pineapple",
    span: "Early 20th c. → present",
    episodeMinutes: 6,
    regions: ["mexico-city", "beirut"],
    dishes: ["tacos-al-pastor"],
    timeline: [
      { year: "1920s–30s", event: "Lebanese and Syrian migrants bring shawarma to Puebla and Mexico City." },
      { year: "mid-1900s", event: "Achiote and guajillo re-marinate the spit; pineapple crowns the trompo." },
      { year: "today", event: "Al pastor is Mexico's most-requested taco and a global crossover hit." },
    ],
    scenes: [
      { scene: 1, minutes: 2, title: "A port of people", synopsis: "Migration carries a vertical spit across the Atlantic." },
      { scene: 2, minutes: 2, title: "The re-marinade", synopsis: "What Mexico does to a shawarma: rotation, achiote, chile." },
      { scene: 3, minutes: 2, title: "Pineapple over the skyline", synopsis: "The trompo's crown and a taco that outgrew its origin story." },
    ],
    provenance:
      "Drawn from oral-history food writing about the Lebanese-Mexican community. Video BLOCKED_EXTERNAL_DEPENDENCY.",
    poster: "/media/poster-history.svg",
  },
  {
    slug: "one-pot-two-countries",
    title: "One Pot, Two Countries",
    artefact: "Rice, peppers, fire",
    span: "West African hearths → present",
    episodeMinutes: 6,
    regions: ["ibadan", "accra"],
    dishes: ["jollof-rice", "kenkey"],
    timeline: [
      { year: "Pre-colonial", event: "One-pot, fire-fed cooking with fermented starches and pepper stews." },
      { year: "Colonial era", event: "Tomato, rice and palm oil align into the modern jollof base." },
      { year: "today", event: "Nigeria–Ghana rivalry vents at every party, naming jollof king." },
    ],
    scenes: [
      { scene: 1, minutes: 2, title: "The hearth grammar", synopsis: "Fire, grain, smoke: the coals West Africa cooked on." },
      { scene: 2, minutes: 2, title: "Red arrives", synopsis: "Tomato meets palm oil and the pot turns the party color." },
      { scene: 3, minutes: 2, title: "The rivalry is the recipe", synopsis: "Why longest-simmer arguments make the best rice." },
    ],
    provenance:
      "Compiled from regional food-writing and oral tradition; assertions stay modest. Video BLOCKED_EXTERNAL_DEPENDENCY.",
    poster: "/media/poster-history.svg",
  },
  {
    slug: "sauce-before-a-nation",
    title: "A Sauce Before a Nation",
    artefact: "Minced meat, wine, long flame",
    span: "Medieval Bologna → present",
    episodeMinutes: 5,
    regions: ["bologna"],
    dishes: ["tagliatelle-al-ragu"],
    timeline: [
      { year: "Medieval", event: "Bologna's university city and plain feed a rich, long-cooking table." },
      { year: "1982", event: "The Italian Academy registers the 'official' ragù alla bolognese recipe." },
      { year: "today", event: "The recipe is the world's most-imitated home sauce — and still argued over." },
    ],
    scenes: [
      { scene: 1, minutes: 2, title: "The university city", synopsis: "Why a scholars' town cooked slow and rich." },
      { scene: 2, minutes: 2, title: "Three hours, no lid", synopsis: "The reduction that turns minced meat into silk." },
      { scene: 3, minutes: 1, title: "The most-copied recipe", synopsis: "Ragù's export from Bologna to every family kitchen." },
    ],
    provenance:
      "Based on the registered 1982 Academy recipe and Italian culinary-writing history. Video BLOCKED_EXTERNAL_DEPENDENCY.",
    poster: "/media/poster-history.svg",
  },
  {
    slug: "harbor-table",
    title: "The Harbor Table",
    artefact: "Fish, saffron, rouille",
    span: "600 BC → present",
    episodeMinutes: 5,
    regions: ["marseille"],
    dishes: ["bouillabaisse"],
    timeline: [
      { year: "600 BC", event: "Greek colony founders build the port and its fishing economy." },
      { year: "Modern", event: "Two-service bouillabaisse — broth then fish — settles as the rule." },
      { year: "2015", event: "Marseille is named a UNESCO Creative City of Gastronomy." },
    ],
    scenes: [
      { scene: 1, minutes: 2, title: "The Greek port", synopsis: "Oldest city in France, built on a fish economy." },
      { scene: 2, minutes: 2, title: "Rouille and ritual", synopsis: "Saffron, garlic and the two-service table that refuses to change." },
      { scene: 3, minutes: 1, title: "A city in its bowl", synopsis: "What UNESCO recognized in 2015." },
    ],
    provenance:
      "Public history and French culinary writing. Video BLOCKED_EXTERNAL_DEPENDENCY.",
    poster: "/media/poster-history.svg",
  },
];

export function getFilm(slug: string): HistoryFilm | undefined {
  return HISTORY_FILMS.find((film) => film.slug === slug);
}