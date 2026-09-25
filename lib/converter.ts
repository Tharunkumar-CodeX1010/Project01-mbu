import type { Recipe, RecipeIngredient } from "@/config/recipes";

export type MassUnit = "g" | "kg" | "oz" | "lb";
export type VolumeUnit = "ml" | "l" | "tsp" | "tbsp" | "cup" | "floz";

export const MASS_TO_G: Record<MassUnit, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
};

export const VOLUME_TO_ML: Record<VolumeUnit, number> = {
  ml: 1,
  l: 1000,
  tsp: 5,
  tbsp: 15,
  cup: 240,
  floz: 30,
};

/**
 * Approximate densities (g per ml) for common pantry items. Heuristic table —
 * real pantry scales vary by grind, season and brand.
 */
const DENSITY_G_PER_ML: Record<string, number> = {
  "00 flour": 0.52,
  flour: 0.52,
  "bread flour": 0.55,
  sugar: 0.83,
  "palm sugar": 0.78,
  "granulated sugar": 0.83,
  salt: 1.2,
  yeast: 0.6,
  milk: 1.03,
  cream: 1.0,
  butter: 0.95,
  oil: 0.92,
  "olive oil": 0.91,
  yogurt: 1.03,
  rice: 0.85,
  honey: 1.42,
  sesame: 0.62,
};

function matchDensity(ingredient: string): number | undefined {
  const lower = ingredient.toLowerCase();
  const key = Object.keys(DENSITY_G_PER_ML).find(
    (name) => lower === name || lower.includes(name)
  );
  return key ? DENSITY_G_PER_ML[key] : undefined;
}

export function parseQuantity(
  qty: string
): { amount: number; unit: string } | null {
  const match = qty.trim().match(/^([\d.,]+)\s*(ml|l|tsp|tbsp|cup|floz|g|kg|oz|lb)?/i);
  if (!match) return null;
  const amount = Number(match[1].replace(",", "."));
  if (!Number.isFinite(amount)) return null;
  return { amount, unit: (match[2] ?? "").toLowerCase() };
}

export function convertMass(amount: number, from: MassUnit, to: MassUnit): number {
  return (amount * MASS_TO_G[from]) / MASS_TO_G[to];
}

export function convertVolume(amount: number, from: VolumeUnit, to: VolumeUnit): number {
  return (amount * VOLUME_TO_ML[from]) / VOLUME_TO_ML[to];
}

/** Volume↔mass needs a density; defaults to water (1 g/ml). */
export function convertVolumeToMass(
  amount: number,
  from: VolumeUnit,
  to: MassUnit,
  ingredient?: string
): number {
  const density = matchDensity(ingredient ?? "") ?? 1;
  const grams = amount * VOLUME_TO_ML[from] * density;
  return grams / MASS_TO_G[to];
}

export function convertMassToVolume(
  amount: number,
  from: MassUnit,
  to: VolumeUnit,
  ingredient?: string
): number {
  const density = matchDensity(ingredient ?? "") ?? 1;
  const ml = (amount * MASS_TO_G[from]) / density;
  return ml / VOLUME_TO_ML[to];
}

export function convertTemperature(value: number, from: "C" | "F" | "K", to: "C" | "F" | "K"): number {
  let celsius: number;
  if (from === "C") celsius = value;
  else if (from === "F") celsius = ((value - 32) * 5) / 9;
  else celsius = value - 273.15;

  if (to === "C") return celsius;
  if (to === "F") return (celsius * 9) / 5 + 32;
  return celsius + 273.15;
}

function roundSensible(amount: number, unit: string): number {
  const base = unit === "g" || unit === "ml" || unit === "floz" ? 1 : 0.25;
  return Math.round(amount / base) * base;
}

export interface ScaledIngredient extends RecipeIngredient {
  original: string;
}

/** Scale a recipe's ingredients to a target serving count. */
export function scaleRecipe(recipe: Recipe, target: number): ScaledIngredient[] {
  const factor = target / recipe.servings;
  return recipe.ingredients.map((ingredient) => {
    const parsed = parseQuantity(ingredient.qty);
    if (!parsed) {
      return { ...ingredient, original: ingredient.qty };
    }
    const scaled = parsed.amount * factor;
    let rendered = `${roundSensible(scaled, parsed.unit)} ${parsed.unit}`.trim();
    if (parsed.unit === "") {
      rendered = String(Math.max(1, Math.round(scaled)));
    } else if (parsed.unit === "tsp" || parsed.unit === "tbsp") {
      // surface as fractions when small
      rendered = formatFraction(scaled, parsed.unit);
    } else if (parsed.unit === "cup") {
      rendered = formatFraction(scaled, "cup");
    }
    return { ...ingredient, qty: rendered, original: ingredient.qty };
  });
}

function formatFraction(amount: number, unit: string): string {
  const rounded = Math.round(amount * 4) / 4;
  const whole = Math.floor(rounded);
  const frac = rounded % 1;
  const fracLabel =
    frac === 0.5 ? "½" : frac === 0.25 ? "¼" : frac === 0.75 ? "¾" : frac === 0 ? "" : String(rounded);
  const label = `${whole > 0 ? whole : ""}${fracLabel}`.trim();
  return `${label === "" ? "1" : label} ${unit}`.trim();
}