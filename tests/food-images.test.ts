import { describe, expect, it } from "vitest";
import {
  foodImageForFilm,
  foodImageForRecipe,
  foodImageForRegion,
  foodImageForVein,
  RECIPE_IMAGES,
} from "@/lib/food-images";
import { posterForRecipe, posterForRegion, posterForVein } from "@/lib/poster";
import { heroFallback } from "@/config/hero";
import { RECIPES } from "@/config/recipes";
import { REGIONS, VEINS } from "@/config/regions";
import { HISTORY_FILMS } from "@/lib/history";

const WIKIMEDIA = /^https:\/\/(thumb|upload)\.wikimedia\.org\/wikipedia\/commons\/(thumb\/)?[^ ]+$/;

describe("real food photography", () => {
  it("resolves a real photo for every recipe", () => {
    for (const recipe of RECIPES) {
      const url = foodImageForRecipe(recipe.slug);
      expect(url, `missing photo for ${recipe.slug}`).toBeTruthy();
      expect(url, `non-wikimedia URL for ${recipe.slug}`).toMatch(WIKIMEDIA);
    }
  });

  it("resolves a real photo for every region", () => {
    for (const region of REGIONS) {
      expect(foodImageForRegion(region.slug), `missing region photo ${region.slug}`).toBeTruthy();
    }
  });

  it("resolves a real photo for every vein", () => {
    for (const vein of VEINS) {
      expect(foodImageForVein(vein.slug), `missing vein photo ${vein.slug}`).toBeTruthy();
    }
  });

  it("resolves a real photo for every history film", () => {
    for (const film of HISTORY_FILMS) {
      expect(foodImageForFilm(film.slug), `missing film photo ${film.slug}`).toBeTruthy();
    }
  });

  it("keeps a procedural fallback for every recipe", () => {
    for (const recipe of RECIPES) {
      expect(posterForRecipe(recipe.slug), `missing recipe fallback ${recipe.slug}`).toMatch(/^\/media\/.*\.svg$/);
    }
  });

  it("region and vein fallbacks stay in-repo SVG", () => {
    for (const region of REGIONS) {
      expect(posterForRegion(region.slug)).toMatch(/^\/media\/.*\.svg$/);
    }
    for (const vein of VEINS) {
      expect(posterForVein(vein.slug)).toMatch(/^\/media\/.*\.svg$/);
    }
  });

  it("hero uses a real photo, not the old SVG", () => {
    expect(heroFallback.poster).toMatch(WIKIMEDIA);
  });

  it("every recipe image key matches a recipe slug", () => {
    const slugs = new Set(RECIPES.map((recipe) => recipe.slug));
    for (const key of Object.keys(RECIPE_IMAGES)) {
      expect(slugs.has(key), `orphan image key ${key}`).toBe(true);
    }
  });
});