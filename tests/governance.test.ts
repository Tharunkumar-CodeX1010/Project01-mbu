import { describe, expect, it } from "vitest";
import { datasetManifest, isModelEnabled, GOVERNANCE } from "@/lib/governance";
import {
  ENSEMBLE,
  assignAgent,
  allProtocolsValid,
  validateProtocol,
} from "@/lib/protocols";
import { RECIPES } from "@/config/recipes";
import { VEINS, REGIONS } from "@/config/regions";
import { HISTORY_FILMS } from "@/lib/history";
import { TECHNIQUES } from "@/lib/techniques";
import { INGREDIENTS } from "@/lib/ingredients";

describe("model-training governance", () => {
  it("manifest counts match live config arrays exactly", () => {
    const counts = Object.fromEntries(
      datasetManifest().map((entry) => [entry.id, entry.count])
    );
    expect(counts.recipes).toBe(RECIPES.length);
    expect(counts.veins).toBe(VEINS.length);
    expect(counts.regions).toBe(REGIONS.length);
    expect(counts.films).toBe(HISTORY_FILMS.length);
    expect(counts.techniques).toBe(TECHNIQUES.length);
    expect(counts.ingredients).toBe(INGREDIENTS.length);
  });

  it("no model is enabled in this build", () => {
    expect(isModelEnabled()).toBe(false);
    expect(GOVERNANCE.approvedModelProviders).toEqual([]);
    expect(GOVERNANCE.modelServiceStatus).toBe("BLOCKED_EXTERNAL_DEPENDENCY");
  });

  it("policy names concrete disallowed practices", () => {
    expect(GOVERNANCE.disallowedPractices.length).toBeGreaterThanOrEqual(3);
    expect(GOVERNANCE.provenanceRequirement).toContain("trace to a live config entry");
  });
});

describe("ensemble protocols", () => {
  it("has four agents and covers the intents", () => {
    expect(ENSEMBLE).toHaveLength(4);
    expect(assignAgent("how do I stretch dough")).toBeDefined();
    expect(assignAgent("plan my week")).toBeDefined();
    expect(assignAgent("where did ceviche come from")).toBeDefined();
    expect(assignAgent("what pairs with saffron")).toBeDefined();
  });

  it("every protocol is valid (grounded, no forbidden sources)", () => {
    expect(allProtocolsValid()).toBe(true);
    for (const agent of ENSEMBLE) {
      expect(validateProtocol(agent)).toEqual([]);
    }
  });

  it("historian may only cite history and regions", () => {
    const historian = ENSEMBLE.find((agent) => agent.id === "historian")!;
    expect(historian.allowedSources.sort()).toEqual(["history", "regions"]);
  });
});