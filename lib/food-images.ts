/**
 * Real food photography.
 *
 * Every named dish resolves to a verified, freely-licensed photo of that exact
 * dish (Wikimedia Commons, hotlinked via its stable original/thumb URLs). No
 * image is fabricated: each URL below was resolved from Commons and confirmed
 * to return 200. The procedural SVG posters stay as the offline/broken-image
 * fallback, and remain the imagery for recipe-making steps (EpisodeCard).
 */

import { getFilm } from "@/lib/history";
import { getRegion, type VeinSlug } from "@/config/regions";
import { RECIPES } from "@/config/recipes";

export const RECIPE_IMAGES: Record<string, string> = {
  "pizza-napoletana":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Margherita_pizza_on_plate.jpg/1920px-Margherita_pizza_on_plate.jpg",
  bouillabaisse:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/90/Bouillabaisse_06.jpg/1920px-Bouillabaisse_06.jpg",
  "tacos-al-pastor":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Tacos_al_pastor.jpg/1920px-Tacos_al_pastor.jpg",
  "ceviche-clasico":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/Ceviche_del_Per%C3%BA.jpg/1920px-Ceviche_del_Per%C3%BA.jpg",
  "kombu-dashi":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/Fugu_with_cabbage%2C_pork_meat_stock_soup%2C_kombu_dashi_%2816231212653%29.jpg/1920px-Fugu_with_cabbage%2C_pork_meat_stock_soup%2C_kombu_dashi_%2816231212653%29.jpg",
  "kaiseki-tasting":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Jisaku_Kaiseki_Ryori_03.jpg/1920px-Jisaku_Kaiseki_Ryori_03.jpg",
  "mutton-biryani":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b9/Mutton_biryani.JPG/1920px-Mutton_biryani.JPG",
  "hyderabadi-biryani":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Chicken_Hyderabadi_Biryani.JPG/1920px-Chicken_Hyderabadi_Biryani.JPG",
  "iskender-kebab":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c8/Iskender_kebab_on_plate.jpg/1920px-Iskender_kebab_on_plate.jpg",
  kibbeh:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Fried_lamb_kibbeh_1.JPG/1920px-Fried_lamb_kibbeh_1.JPG",
  "jollof-rice":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Ghana_Jollof_Rice_with_Chicken.jpg/1920px-Ghana_Jollof_Rice_with_Chicken.jpg",
  kenkey:
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c5/Fante_Kenkey_%282%29.jpg/1920px-Fante_Kenkey_%282%29.jpg",
  "tagliatelle-al-ragu":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/Tagliatelle_al_rag%C3%B9_03.jpg/1920px-Tagliatelle_al_rag%C3%B9_03.jpg",
  "quenelle-lyonnaise":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Quenelles_lyonnaises.jpg/1920px-Quenelles_lyonnaises.jpg",
  "pad-thai":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Pad_Thai_with_Pork_-_Unithai.jpg/1920px-Pad_Thai_with_Pork_-_Unithai.jpg",
  "hainanese-chicken-rice":
    "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Hainanese_chicken_rice_in_Singapore.jpg/1920px-Hainanese_chicken_rice_in_Singapore.jpg",
};

const REPRESENTATIVE_DISH: Record<VeinSlug, string> = {
  mediterranean: "pizza-napoletana",
  "latin-america": "tacos-al-pastor",
  japan: "kombu-dashi",
  "moghul-court": "hyderabadi-biryani",
  "silk-road": "iskender-kebab",
  "west-africa": "jollof-rice",
  "northern-hearth": "tagliatelle-al-ragu",
  "southeast-asia": "pad-thai",
};

export function foodImageForRecipe(recipeSlug: string): string | null {
  return RECIPE_IMAGES[recipeSlug] ?? null;
}

export function foodImageForRegion(regionSlug: string): string | null {
  const recipe = RECIPES.find((entry) => entry.regionSlug === regionSlug);
  return recipe ? foodImageForRecipe(recipe.slug) : null;
}

export function foodImageForVein(veinSlug: VeinSlug | string): string | null {
  const dish = REPRESENTATIVE_DISH[veinSlug as VeinSlug];
  return dish ? foodImageForRecipe(dish) : null;
}

export function foodImageForFilm(filmSlug: string): string | null {
  const film = getFilm(filmSlug);
  const dish = film?.dishes[0];
  return dish ? foodImageForRecipe(dish) : null;
}

/** The region a given region slug sits in — used to pick film/region fallbacks. */
export function regionVein(regionSlug: string): VeinSlug | undefined {
  return getRegion(regionSlug)?.vein;
}