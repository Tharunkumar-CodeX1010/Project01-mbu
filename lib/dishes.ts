import { getRegion } from "@/config/regions";
import { RECIPES } from "@/config/recipes";

export interface Dish {
  slug: string;
  name: string;
  region: string;
  regionSlug: string;
  vein: string;
  archetype: string;
  cuisine: string;
  blurb: string;
  timeMin: number;
}

export const DISHES: Dish[] = RECIPES.map((recipe) => {
  const region = getRegion(recipe.regionSlug);
  return {
    slug: recipe.slug,
    name: recipe.name,
    region: region?.name ?? recipe.regionSlug,
    regionSlug: recipe.regionSlug,
    vein: region?.vein ?? "unknown",
    archetype: region?.archetype ?? "",
    cuisine: `${region?.country ?? ""} • ${recipe.difficulty}`,
    blurb: recipe.blurb,
    timeMin: recipe.timeMin,
  };
});

export const DISH_VEINS: string[] = Array.from(
  new Set(DISHES.map((dish) => dish.vein))
).sort();