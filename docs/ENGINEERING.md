// ============================================================
// PROJECT TAC — YUMMYGO engineering operating protocol
//
// This file codifies the execution contract and truth-status
// taxonomy used across the 30-section build.
// ============================================================

## Execution loop

For EVERY section:

1. Inspect existing implementation and dependencies.
2. Implement the section completely.
3. Run typecheck, lint, relevant tests, build.
4. Run functional checks where possible.
5. Inspect resulting files and integration points.
6. Fix every discovered error before proceeding.
7. Review `git status` and `git diff`.
8. Commit with a section-specific conventional message.
9. Push to `origin/main`; verify the push actually succeeded.
10. Record: commit hash, push status, tests, known limitations.

## Truth-status labels

- IMPLEMENTED — code exists and executes.
- VERIFIED — an actual gate (typecheck/lint/test/build/scan) passed.
- MEASURED — a real observed value (FCP/LCP/Lighthouse/API latency).
- MOCKED — simulated integration, clearly labelled in the UI.
- SIMULATED — deterministic stand-in behaviour (e.g. local AI engine).
- EXTERNAL_DEPENDENCY — requires an unavailable service (Postgres, Redis, live grocery/video APIs).
- NOT IMPLEMENTED — deliberately not built.
- BLOCKED — attempted, impossible in this environment.

Rules: never label MOCKED as LIVE; never report a TARGET as MEASURED; never claim a test passed that
was not executed; never claim a push succeeded that did not return success; if `origin/main` is
unavailable, report `LOCAL_COMMIT_SUCCESS` / `REMOTE_PUSH_BLOCKED`.

## External integration policy

- Database / Redis / queues: BLOCKED_EXTERNAL_DEPENDENCY here; schema + adapters + static seed instead.
- Grocery providers (Blinkit, Zepto, Instamart, ...): MOCKED adapters behind a provider-independent
  interface. No fabricated live prices.
- Video platforms: embed-safe references or MOCKED metadata, never invented IDs/titles/views.
- AI model: deterministic local engine + mock LLM adapter; real model optional via env, fails closed.
- Location: permission-gated, coarse-region only, minimal retention.
- Model training: governance pipeline + registry only; training/deployment is NOT IMPLEMENTED locally.

## Final report requirement

After Section 30, produce evidence-only reports: 30-section matrix (Implemented | Verified | Tests |
Commit | Push), Git report, Performance (or NOT MEASURED), Test, Security, AI, and Marketplace
reports, plus a staged scaling roadmap.