# Training & Model Governance (Section 28 — policy)

Status: **no model is trained or served from this build.** This is deliberate and
recorded. The `lib/governance.ts` module is the enforceable contract for anything
that changes that answer.

## Corpus

Only in-repo config arrays qualify (see `datasetManifest()`):

| Item | Count | Source |
| --- | --- | --- |
| Culinary veins | 8 | `config/regions.ts` |
| Regions | 16 | `config/regions.ts` |
| Recipes | 16 | `config/recipes.ts` |
| History films | 8 | `lib/history.ts` |
| Techniques | 12 | `lib/techniques.ts` |
| Ingredients | 23 | `lib/ingredients.ts` |

No scraped markup, no third-party corpora, no user local-storage.

## Rules

1. **Provenance**: every model-facing claim must trace to a live config entry.
   New facts (prices, timings, origins, footage) may not be synthesized.
2. **Media honesty**: "video" may only be so-called when real encoded footage
   exists; otherwise the build calls it a procedural poster / simulated
   autoplay / derived transcript.
3. **Consent**: user local data (kitchen profile, shopping, collections,
   planner) is per-browser and never enters the corpus.
4. **Retraining triggers**: confirmed provenance violation; material dataset
   change; provider pricing-contract change.

## Approval gate

`GOVERNANCE.approvedModelProviders` starts empty. Flipping it to non-empty
requires: a written supplier contract, a privacy assessment, and an audit row —
the `isModelEnabled()` invariant flips at the same commit.