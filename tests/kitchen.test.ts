// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import {
  gradeKitchen,
  compatibilityFor,
  achievementsFor,
  DEFAULT_KITCHEN_PROFILE,
} from "@/lib/kitchen";
import { getRecipe } from "@/config/recipes";

describe("gradeKitchen", () => {
  it("grades a stocked kitchen A", () => {
    const grade = gradeKitchen({
      ...DEFAULT_KITCHEN_PROFILE,
      skill: "advanced",
      equipment: ["stovetop", "oven", "wok", "dutch-oven", "cast-iron", "sous-vide", "smoker", "thermometer", "pressure-cooker"],
    });
    expect(grade.tier).toBe("A");
    expect(grade.label).toContain("Enabled");
  });

  it("grades an empty kitchen C", () => {
    const grade = gradeKitchen({
      ...DEFAULT_KITCHEN_PROFILE,
      skill: "beginner",
      equipment: ["stovetop"],
      pantry: [],
    });
    expect(grade.tier).toBe("C");
  });
});

describe("compatibilityFor", () => {
  it("flags missing ingredients for a pantry gap", () => {
    const recipe = getRecipe("tacos-al-pastor")!;
    const compat = compatibilityFor(recipe, ["pork", "pineapple", "corn"]);
    expect(compat.matched.length).toBeGreaterThan(0);
    expect(compat.missing.some((m) => m.toLowerCase().includes("guajillo"))).toBe(true);
    expect(compat.score).toBeGreaterThan(0);
  });

  it("treats stop words as free", () => {
    const recipe = getRecipe("kombu-dashi")!;
    const compat = compatibilityFor(recipe, []);
    expect(compat.missing.some((m) => m.toLowerCase() === "water")).toBe(false);
  });
});

describe("achievementsFor", () => {
  it("unlocks pantry-10 when ten ingredients tracked", () => {
    const profile = {
      ...DEFAULT_KITCHEN_PROFILE,
      pantry: Array.from({ length: 10 }, (_, i) => `item ${i}`),
    };
    const reached = achievementsFor(profile).filter((a) => a.reached).map((a) => a.id);
    expect(reached).toContain("pantry-10");
  });
});