import { getRecipe } from "@/config/recipes";
import { parseQuantity } from "@/lib/converter";

export const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type DayKey = (typeof WEEK_DAYS)[number];

export type WeekPlan = Record<DayKey, string | null>;

export const EMPTY_WEEK: WeekPlan = {
  Mon: null,
  Tue: null,
  Wed: null,
  Thu: null,
  Fri: null,
  Sat: null,
  Sun: null,
};

export const PLANNER_KEY = "tac.planner.v1";

export function readPlan(): WeekPlan {
  if (typeof window === "undefined") return { ...EMPTY_WEEK };
  try {
    const raw = window.localStorage.getItem(PLANNER_KEY);
    if (!raw) return { ...EMPTY_WEEK };
    const parsed = JSON.parse(raw) as Partial<WeekPlan>;
    return { ...EMPTY_WEEK, ...parsed };
  } catch {
    return { ...EMPTY_WEEK };
  }
}

export function writePlan(plan: WeekPlan) {
  try {
    window.localStorage.setItem(PLANNER_KEY, JSON.stringify(plan));
  } catch {
    // memory-only until refresh
  }
}

export interface PlannedIngredient {
  item: string;
  qty: string;
  recipes: string[];
  grams?: number;
  unit?: string;
}

/** Aggregate a week plan into a flat ingredient list (grams summed when possible). */
export function aggregatePlan(plan: WeekPlan): PlannedIngredient[] {
  const map = new Map<string, PlannedIngredient>();

  for (const day of WEEK_DAYS) {
    const slug = plan[day];
    if (!slug) continue;
    const recipe = getRecipe(slug);
    if (!recipe) continue;

    for (const ingredient of recipe.ingredients) {
      const key = ingredient.item.toLowerCase();
      const existing = map.get(key);
      const parsed = parseQuantity(ingredient.qty);

      if (!existing) {
        map.set(key, {
          item: ingredient.item,
          qty: ingredient.qty,
          recipes: [recipe.name],
          grams: parsed?.unit === "g" ? parsed.amount : undefined,
          unit: parsed?.unit ?? undefined,
        });
        continue;
      }

      if (!existing.recipes.includes(recipe.name)) {
        existing.recipes.push(recipe.name);
      }
      if (parsed?.unit === "g" && existing.grams !== undefined) {
        existing.grams += parsed.amount;
        existing.qty = `${existing.grams} g`;
      }
    }
  }

  return Array.from(map.values());
}

export function planStats(plan: WeekPlan): { filled: number; total: number } {
  const filled = WEEK_DAYS.filter((day) => plan[day] !== null).length;
  return { filled, total: WEEK_DAYS.length };
}