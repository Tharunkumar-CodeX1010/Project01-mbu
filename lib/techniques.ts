export interface Technique {
  slug: string;
  name: string;
  category:
    | "Knife"
    | "Foundation"
    | "Saucing"
    | "Fermentation"
    | "Baking"
    | "Grill & Fire"
    | "Plating";
  skill: "Essential" | "Advancing" | "Mastery";
  minutes: number;
  summary: string;
  detail: string;
  relatedDishes: string[];
}

export const TECHNIQUES: Technique[] = [
  {
    slug: "hand-dough",
    name: "Hand-stretched dough",
    category: "Baking",
    skill: "Advancing",
    minutes: 12,
    summary: "Turning unruly dough into a cornicione-rimmed disc.",
    detail:
      "Press from the center outward, never the pin. Hydration ~65% keeps the crumb open and the rim tall.",
    relatedDishes: ["pizza-napoletana"],
  },
  {
    slug: "dum-sealing",
    name: "Dum (sealed-lid slow steam)",
    category: "Foundation",
    skill: "Mastery",
    minutes: 8,
    summary: "The Lid of patience: steam sealed in, flavor sealed with it.",
    detail:
      "Dough or towel seals the pot rim; a low flame finishes what layering started. Never open mid-cook.",
    relatedDishes: ["mutton-biryani", "hyderabadi-biryani"],
  },
  {
    slug: "acid-cure",
    name: "Acid-curing seafood",
    category: "Foundation",
    skill: "Advancing",
    minutes: 10,
    summary: "Cooking without fire, timed in minutes.",
    detail:
      "Citrus denatures fish protein; 5–8 minutes in lime is the ceviche window. Longer means leather.",
    relatedDishes: ["ceviche-clasico"],
  },
  {
    slug: "katsuobushi-shaving",
    name: "Dashi steeping",
    category: "Foundation",
    skill: "Essential",
    minutes: 6,
    summary: "Two ingredients, one clean bowl of umami.",
    detail:
      "Kombu steeps gently, then leaves before the boil; bonito flashes in and leaves. Strain, never squeeze.",
    relatedDishes: ["kombu-dashi"],
  },
  {
    slug: "knife-chop",
    name: "Knife foundations",
    category: "Knife",
    skill: "Essential",
    minutes: 20,
    summary: "The claw grip, the rocking chop, the confident thumb.",
    detail:
      "Hold with fingertips tucked, guide with knuckles, anchor with the blade's heel. Speed follows control.",
    relatedDishes: ["tacos-al-pastor", "tagliatelle-al-ragu"],
  },
  {
    slug: "rouille",
    name: "Rouille & the two-service table",
    category: "Saucing",
    skill: "Advancing",
    minutes: 12,
    summary: "Garlic-saffron oil paste that crown any soup.",
    detail:
      "Emulsify garlic, saffron and chile with olive oil by slow dribble; the broth and the fish must be served apart.",
    relatedDishes: ["bouillabaisse"],
  },
  {
    slug: "meringue-fold",
    name: "Quenelle shaping & folding",
    category: "Plating",
    skill: "Mastery",
    minutes: 15,
    summary: "Cold cream folding, twin-spoon ovals.",
    detail:
      "Cold everything; fold cream in two passes until just bound. Shape with two spoons dipped in water.",
    relatedDishes: ["quenelle-lyonnaise"],
  },
  {
    slug: "ferment-corn",
    name: "Fermentation for doughs",
    category: "Fermentation",
    skill: "Mastery",
    minutes: 20,
    summary: "Patience is an ingredient: maize, flour, time.",
    detail:
      "Fermented maize turns sour and holds steam; kenkey lives on doing it correctly on a schedule.",
    relatedDishes: ["kenkey"],
  },
  {
    slug: "short-fire",
    name: "High-heat wok moves",
    category: "Grill & Fire",
    skill: "Advancing",
    minutes: 10,
    summary: "Fast, dry, loud — the wok's grammar.",
    detail:
      "Preheat hard, work in batches, toss between passes. The sauce goes in last and aggressively.",
    relatedDishes: ["pad-thai"],
  },
  {
    slug: "slow-ragu",
    name: "The long reduction",
    category: "Saucing",
    skill: "Advancing",
    minutes: 180,
    summary: "Three hours, no lid. Meat becomes silk.",
    detail:
      "Brown hard, deglaze, then let the sauce reduce uncovered. Stirring is a courtesy, not a requirement.",
    relatedDishes: ["tagliatelle-al-ragu"],
  },
  {
    slug: "poach-silk",
    name: "Gentle-poaching proteins",
    category: "Foundation",
    skill: "Advancing",
    minutes: 25,
    summary: "85 °C, never a boil — the silk rule.",
    detail:
      "Whole chicken at 85–90 °C stays juicy; the poach-then-shock cycle firms the skin and sets gelatin.",
    relatedDishes: ["hainanese-chicken-rice"],
  },
  {
    slug: "lebait-press",
    name: "Pressing, shaping & frying",
    category: "Foundation",
    skill: "Advancing",
    minutes: 15,
    summary: "Dry hands, sealed shapes, golden edges.",
    detail:
      "Palm-and-finger interiors with even pressure; chill before frying so the seam holds.",
    relatedDishes: ["kibbeh"],
  },
];

export function getTechnique(slug: string): Technique | undefined {
  return TECHNIQUES.find((technique) => technique.slug === slug);
}

export const TECHNIQUE_CATEGORIES: Technique["category"][] = [
  "Knife",
  "Foundation",
  "Saucing",
  "Fermentation",
  "Baking",
  "Grill & Fire",
  "Plating",
];