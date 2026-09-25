// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import {
  EMPTY_WEEK,
  aggregatePlan,
  planStats,
} from "@/lib/planner";
import { getRecipe } from "@/config/recipes";

describe("planner aggregation", () => {
  it("aggregates a plan and sums gram quantities", () => {
    const recipeA = getRecipe("jollof-rice")!; // 500 g long-grain rice
    const recipeB = getRecipe("hainanese-chicken-rice")!; // 400 g jasmine rice
    const plan: typeof EMPTY_WEEK = {
      ...EMPTY_WEEK,
      Mon: recipeA.slug,
      Tue: recipeA.slug,
      Wed: recipeB.slug,
    };

    const items = aggregatePlan(plan);
    const rice = items.find((item) => item.item === "long-grain rice");
    const jasmine = items.find((item) => item.item === "jasmine rice");
    expect(rice?.grams).toBe(1000); // twice on the plan
    expect(jasmine?.grams).toBe(400);
    expect(rice?.recipes).toContain("Jollof Rice");
  });

  it("reports filled and total slots", () => {
    const plan: typeof EMPTY_WEEK = { ...EMPTY_WEEK, Sat: "pad-thai", Sun: "kibbeh" };
    expect(planStats(plan)).toEqual({ filled: 2, total: 7 });
  });

  it("returns empty for an empty plan", () => {
    expect(aggregatePlan({ ...EMPTY_WEEK })).toEqual([]);
  });
});