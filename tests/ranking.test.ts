import { describe, expect, it } from "vitest";
import { rankRecipes, relatedRecipes } from "@/lib/ranking";
import { getRecipe } from "@/config/recipes";

describe("ranking engine", () => {
  it("ranks a name-term match highest for relevance", () => {
    const ranked = rankRecipes("biryani", "relevance");
    expect(ranked[0].name.toLowerCase()).toContain("biryani");
    expect(ranked[0].score).toBeGreaterThan(0);
  });

  it("quickest mode surfaces under-30-minute dishes first", () => {
    const ranked = rankRecipes("", "quickest");
    for (const recipe of ranked) {
      expect(typeof recipe.score).toBe("number");
    }
    const fastest = ranked[0];
    expect(fastest.timeMin).toBeLessThanOrEqual(
      Math.min(...ranked.map((entry) => entry.timeMin))
    );
  });

  it("relevance filters out non-matches only when a query exists", () => {
    const withQuery = rankRecipes("saffron", "relevance");
    expect(withQuery.every((recipe) => recipe.score > 0)).toBe(true);
    const all = rankRecipes("", "relevance");
    expect(all.length).toBeGreaterThanOrEqual(withQuery.length);
  });

  it("finds related recipes by ingredient overlap", () => {
    const pizza = getRecipe("pizza-napoletana")!;
    const related = relatedRecipes(pizza.slug, 3);
    expect(related.length).toBeGreaterThan(0);
    expect(related.some((recipe) => recipe.slug === pizza.slug)).toBe(false);
  });
});