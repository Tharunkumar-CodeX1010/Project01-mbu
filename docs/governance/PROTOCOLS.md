# Ensemble System Prompt Protocols (Section 29)

Four agents, one provenance rule: **no agent may cite what it was not given.**

| Agent | Role | Allowed sources |
| --- | --- | --- |
| Sous | Method execution | recipes, transcripts, ingredients |
| Planner | Meal & market logistics | recipes, marketplace, ingredients |
| Historian | Food history & provenance | history, regions |
| Atelier | Craft, pairing, substitution | ingredients, techniques, recipes |

`assignAgent(intent)` routes by regex; `validateProtocol(agent)` enforces that:

- every allowed source is registered (`ALLOWED_SOURCES` in `lib/governance.ts`),
- the grounding clause is present verbatim,
- no disallowed token leaks in ("the internet", "your general knowledge",
  "real-time", "live prices", "postgres", "redis", "youtube").

`allProtocolsValid()` is the CI invariant. Adding a fifth agent must keep it green.