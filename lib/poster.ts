import { getRegion, type VeinSlug } from "@/config/regions";
import { getRecipe } from "@/config/recipes";

/**
 * Procedural poster assigner. Every poster is self-contained SVG (no external
 * CSS vars), produced in-repo — imagery that always renders, with no photo or
 * licensing dependency.
 */

const POSTER_BY_VEIN: Record<VeinSlug, string> = {
  mediterranean: "/media/poster-mediterranean.svg",
  "latin-america": "/media/poster-latin-america.svg",
  japan: "/media/poster-japan.svg",
  "moghul-court": "/media/poster-moghul-court.svg",
  "silk-road": "/media/poster-silk-road.svg",
  "west-africa": "/media/poster-west-africa.svg",
  "northern-hearth": "/media/poster-northern-hearth.svg",
  "southeast-asia": "/media/poster-southeast-asia.svg",
};

const FALLBACK = POSTER_BY_VEIN.mediterranean;

export function posterForVein(veinSlug: VeinSlug): string {
  return POSTER_BY_VEIN[veinSlug] ?? FALLBACK;
}

export function posterForRegion(regionSlug: string): string {
  const vein = getRegion(regionSlug)?.vein;
  return vein ? posterForVein(vein) : FALLBACK;
}

export function posterForRecipe(recipeSlug: string): string {
  const region = getRecipe(recipeSlug)?.regionSlug;
  return region ? posterForRegion(region) : FALLBACK;
}