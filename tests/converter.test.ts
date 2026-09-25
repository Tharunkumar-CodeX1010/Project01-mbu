import { describe, expect, it } from "vitest";
import {
  parseQuantity,
  convertMass,
  convertVolume,
  convertTemperature,
  convertVolumeToMass,
  convertMassToVolume,
  scaleRecipe,
} from "@/lib/converter";
import { findSubstitutions } from "@/lib/substitutions";
import { getRecipe } from "@/config/recipes";

describe("unit conversion", () => {
  it("parses a wrapped quantity", () => {
    expect(parseQuantity("2 tbsp")?.amount).toBe(2);
    expect(parseQuantity("1.5 kg")?.unit).toBe("kg");
    expect(parseQuantity("handful")).toBeNull();
  });

  it("converts mass", () => {
    expect(convertMass(1, "kg", "g")).toBe(1000);
    expect(convertMass(16, "oz", "lb")).toBeCloseTo(1, 5);
  });

  it("converts volume", () => {
    expect(convertVolume(1, "cup", "ml")).toBe(240);
    expect(convertVolume(3, "tsp", "tbsp")).toBe(1);
  });

  it("converts temperature", () => {
    expect(convertTemperature(0, "C", "F")).toBe(32);
    expect(convertTemperature(180, "C", "F")).toBe(356);
    expect(convertTemperature(32, "F", "C")).toBe(0);
  });

  it("handles flour density in volume→mass", () => {
    // 1 cup flour ≈ 125 g at 0.52 g/ml
    expect(convertVolumeToMass(1, "cup", "g", "flour")).toBeCloseTo(124.8, 0);
  });

  it("treats unknown ingredient as water", () => {
    expect(convertMassToVolume(150, "g", "ml", "mystery-stock")).toBe(150);
  });
});

describe("recipe scaling", () => {
  it("scales a recipe to a new serving count", () => {
    const recipe = getRecipe("jollof-rice")!;
    const scaled = scaleRecipe(recipe, 3);
    // original 500 g long-grain rice at 6 servings → 250 g at 3
    const rice = scaled.find((i) => i.item === "long-grain rice");
    expect(rice?.qty).toContain("250");
  });

  it("keeps unparseable quantities verbatim", () => {
    const recipe = getRecipe("pizza-napoletana")!;
    const scaled = scaleRecipe(recipe, 4);
    const basil = scaled.find((i) => i.item === "fresh basil");
    expect(basil?.qty).toBe("handful");
  });
});

describe("substitutions", () => {
  it("finds palm sugar alternatives", () => {
    const hits = findSubstitutions("palm sugar");
    expect(hits[0].ingredient).toBe("palm sugar");
    expect(hits[0].alternatives[0].name).toContain("jaggery");
  });

  it("finds nothing on a miss", () => {
    expect(findSubstitutions("unobtainium")).toEqual([]);
  });
});