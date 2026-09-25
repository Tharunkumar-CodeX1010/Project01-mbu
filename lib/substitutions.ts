export interface Substitution {
  ingredient: string;
  alternatives: Array<{ name: string; confidence: number; note?: string }>;
}

/**
 * Heuristic substitution map. Confidence is editorial, not measured —
 * labeled as approximations in the UI.
 */
export const SUBSTITUTIONS: Substitution[] = [
  {
    ingredient: "buttermilk",
    alternatives: [
      { name: "yogurt thinned with milk", confidence: 0.9 },
      { name: "milk + lemon juice", confidence: 0.75, note: "rest 5 min before use" },
    ],
  },
  {
    ingredient: "egg",
    alternatives: [
      { name: "flax egg", confidence: 0.6, note: "1 tbsp ground flax + 3 tbsp water" },
      { name: "unsweetened applesauce", confidence: 0.55, note: "best in batters" },
    ],
  },
  {
    ingredient: "fish sauce",
    alternatives: [
      { name: "soy sauce + splash of rice vinegar", confidence: 0.6 },
      { name: "mushroom seasoning in water", confidence: 0.5, note: "vegetarian" },
    ],
  },
  {
    ingredient: "palm sugar",
    alternatives: [
      { name: "jaggery", confidence: 0.9 },
      { name: "brown sugar", confidence: 0.85 },
    ],
  },
  {
    ingredient: "saffron",
    alternatives: [
      { name: "turmeric", confidence: 0.3, note: "color only — not flavor" },
    ],
  },
  {
    ingredient: "bufala mozzarella",
    alternatives: [
      { name: "fior di latte", confidence: 0.95 },
      { name: "low-moisture mozzarella", confidence: 0.7, note: "bakes drier" },
    ],
  },
  {
    ingredient: "ají amarillo",
    alternatives: [
      { name: "yellow scotch bonnet", confidence: 0.6 },
      { name: "habanero + sweet pepper", confidence: 0.6 },
    ],
  },
  {
    ingredient: "ají limo",
    alternatives: [
      { name: "habanero", confidence: 0.7 },
      { name: "bird's eye chile", confidence: 0.6, note: "spicier, use less" },
    ],
  },
  {
    ingredient: "guajillo",
    alternatives: [
      { name: "ancho chile", confidence: 0.85 },
      { name: "pasilla chile", confidence: 0.7 },
    ],
  },
  {
    ingredient: "scotch bonnet",
    alternatives: [
      { name: "habanero", confidence: 0.85, note: "similar heat family" },
      { name: "habanero + red bell", confidence: 0.6, note: "diluted for less heat" },
    ],
  },
  {
    ingredient: "kewra water",
    alternatives: [
      { name: "rose water", confidence: 0.6, note: "fragrance, not exact flavor" },
      { name: "omit", confidence: 0.4 },
    ],
  },
  {
    ingredient: "mace",
    alternatives: [
      { name: "nutmeg", confidence: 0.9, note: "use about half" },
    ],
  },
  {
    ingredient: "seven-spice",
    alternatives: [
      { name: "allspice + cinnamon + clove blend", confidence: 0.7 },
    ],
  },
  {
    ingredient: "tamarind",
    alternatives: [
      { name: "lime juice + palm sugar", confidence: 0.6, note: "for pad-thai-style sauce" },
      { name: "pomegranate molasses", confidence: 0.5, note: "sweeter, darker" },
    ],
  },
  {
    ingredient: "pide bread",
    alternatives: [
      { name: "flatbread or naan", confidence: 0.85 },
    ],
  },
  {
    ingredient: "00 flour",
    alternatives: [
      { name: "plain / all-purpose flour", confidence: 0.9 },
      { name: "bread flour", confidence: 0.75, note: "drop hydration ~5%" },
    ],
  },
  {
    ingredient: "basmati",
    alternatives: [
      { name: "jasmine rice", confidence: 0.75, note: "slightly more aromatic" },
      { name: "long-grain rice", confidence: 0.7 },
    ],
  },
  {
    ingredient: "pike",
    alternatives: [
      { name: "firm white fish (cod, haddock)", confidence: 0.7 },
    ],
  },
  {
    ingredient: "bulgur",
    alternatives: [
      { name: "cracked wheat", confidence: 0.9 },
      { name: "couscous", confidence: 0.6, note: "not the same bite" },
    ],
  },
  {
    ingredient: "kombu",
    alternatives: [
      { name: "kelp strips (same species)", confidence: 0.85 },
      { name: "skip", confidence: 0.3, note: "dashi loses umami base" },
    ],
  },
  {
    ingredient: "katsuobushi",
    alternatives: [
      { name: "skip", confidence: 0.3, note: "no true substitute; soup still works" },
    ],
  },
  {
    ingredient: "aleppo pepper",
    alternatives: [
      { name: "paprika + pinch of cayenne", confidence: 0.75 },
    ],
  },
];

const normalized = SUBSTITUTIONS.map((s) => ({
  ...s,
  key: s.ingredient.toLowerCase(),
}));

export function findSubstitutions(query: string): Substitution[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return normalized.filter(
    (s) => s.key.includes(q) || q.includes(s.key)
  );
}