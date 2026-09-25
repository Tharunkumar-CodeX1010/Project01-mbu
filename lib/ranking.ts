import { RECIPES, Recipe } from "@/config/recipes";
import { getRegion } from "@/config/regions";

export type RankMode = "relevance" | "quickest" | "family" | "region";

export interface RankedRecipe extends Recipe {
  score: number;
  reasons: string[];
}

/** Best-for-need ranking. Scores are honest heuristics over live config data. */
export function rankRecipes(query: string, mode: RankMode): RankedRecipe[] {
  const q = query.trim().toLowerCase();
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = RECIPES
    .map((recipe): RankedRecipe => {
      const score = {
        relevance: relevanceScore(recipe, terms),
        quickest: -recipe.timeMin, // ascending time = descending score
        family: recipe.servings,
        region: 0,
      }[mode];

      return {
        ...recipe,
        score,
        reasons: reasonsFor(recipe, mode, terms),
      };
    })
    .sort((a, b) => b.score - a.score);

  if (mode === "relevance" && terms.length > 0) {
    return scored.filter((recipe) => recipe.score > 0);
  }
  return scored;
}

function relevanceScore(recipe: Recipe, terms: string[]): number {
  let score = 0;
  const regionName = getRegion(recipe.regionSlug)?.name ?? "";
  const haystack = [
    recipe.name,
    recipe.blurb,
    regionName,
    ...[recipe.ingredients.map((i) => i.item)],
  ]
    .join(" ")
    .toLowerCase();

  for (const term of terms) {
    if (recipe.name.toLowerCase().includes(term)) score += 10;
    else if (regionName.toLowerCase().includes(term)) score += 6;
    else if (recipe.ingredients.some((i) => i.item.toLowerCase().includes(term))) score += 4;
    else if (haystack.includes(term)) score += 1;
  }
  return score;
}

function reasonsFor(recipe: Recipe, mode: RankMode, terms: string[]): string[] {
  switch (mode) {
    case "quickest":
      return recipe.timeMin <= 30 ? ["fits a busy weekday"] : [];
    case "family":
      return recipe.servings >= 6 ? ["feeds a household"] : [];
    case "region":
      return getRegion(recipe.regionSlug)
        ? [`from the ${getRegion(recipe.regionSlug)!.name} atlas`]
        : [];
    default: {
      const hit = terms.filter(
        (term) =>
          recipe.name.toLowerCase().includes(term) ||
          recipe.ingredients.some((i) => i.item.toLowerCase().includes(term))
      );
      return hit.length > 0 ? [`matches “${hit.join(`, `)}”`] : [];
    }
  }
}

/** Ingredient-overlap relatedness (top-N), excluding self. */
export function relatedRecipes(slug: string, limit = 3): Recipe[] {
  const recipe = RECIPES.find((r) => r.slug === slug);
  if (!recipe) return [];

  const own = recipe.ingredients.map((i) => i.item.toLowerCase());
  return RECIPES.filter((r) => r.slug !== slug)
    .map((r) => {
      const overlap = r.ingredients.filter((i) => own.includes(i.item.toLowerCase())).length;
      return { recipe: r, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap || b.recipe.timeMin - a.recipe.timeMin)
    .slice(0, limit)
    .map((entry) => entry.recipe);
}

/** Most-saved across visitors is unavailable (per-user local storage); fall back to editorial popularity. */
export function editorialPicks(): Recipe[] {
  return (["pizza-napoletana", "mutton-biryani", "ceviche-clasico", "kombu-dashi", "jollof-rice"] as string[])
    .map((slug) => RECIPES.find((r) => r.slug === slug))
    .filter((recipe): recipe is Recipe => Boolean(recipe));
}