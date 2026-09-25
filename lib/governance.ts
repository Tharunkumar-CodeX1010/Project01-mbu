import { RECIPES } from "@/config/recipes";
import { REGIONS, VEINS } from "@/config/regions";
import { HISTORY_FILMS } from "@/lib/history";
import { TECHNIQUES } from "@/lib/techniques";
import { INGREDIENTS } from "@/lib/ingredients";

/**
 * Model-training governance (S28).
 *
 * No model is trained or served from this build — that is honest. This module
 * records the policy, the avowed dataset (only in-repo config arrays), and the
 * invariant checks that keep future training claims truthful.
 */

export interface DatasetManifestEntry {
  id: string;
  label: string;
  count: number;
  provenance: string;
}

function manifest(): DatasetManifestEntry[] {
  return [
    { id: "veins", label: "Culinary veins", count: VEINS.length, provenance: "config/regions.ts" },
    { id: "regions", label: "Regions", count: REGIONS.length, provenance: "config/regions.ts" },
    { id: "recipes", label: "Recipes", count: RECIPES.length, provenance: "config/recipes.ts" },
    { id: "films", label: "History films", count: HISTORY_FILMS.length, provenance: "lib/history.ts" },
    { id: "techniques", label: "Techniques", count: TECHNIQUES.length, provenance: "lib/techniques.ts" },
    { id: "ingredients", label: "Ingredients", count: INGREDIENTS.length, provenance: "lib/ingredients.ts" },
  ];
}

export function datasetManifest(): DatasetManifestEntry[] {
  return manifest();
}

export const GOVERNANCE = {
  approvedModelProviders: [] as string[],
  modelServiceStatus: "BLOCKED_EXTERNAL_DEPENDENCY" as const,
  corpus: "in-repo config arrays only; no scraped or third-party content",
  provenanceRequirement:
    "Every model-facing claim must trace to a live config entry (recipe, region, film, technique, ingredient); unseen facts are forbidden to synthesize.",
  disallowedPractices: [
    "fabricating sources, prices, timings or provenance",
    "claiming recorded video where only procedural posters exist",
    "training on user local-storage (kitchen, shopping) without consent records",
  ],
  retrainingTriggers: [
    "a provenance violation is confirmed",
    "dataset contents change materially",
    "a supplier/provider contract changes pricing structure",
  ],
};

export function isModelEnabled(): boolean {
  return GOVERNANCE.approvedModelProviders.length > 0;
}

/** Allowed source ids an agent may cite (mirrors S29 protocols). */
export const ALLOWED_SOURCES = [
  "recipes",
  "regions",
  "history",
  "transcripts",
  "ingredients",
  "techniques",
  "marketplace",
] as const;