# Security Notes (Section 30)

Status: this is a static-content demo build — no user accounts, no server-side
state, no payment flows. The notes below are what applies and what to keep in
mind before any live integration.

## What is hardened

- **No secrets in the repo.** `.env*` is Git-ignored; only `.env.example` is
  committed. `next.config.ts` sets `poweredByHeader: false`.
- **No remote data ingestion.** All pages compile from typed in-repo config;
  there is no server that phones home, which removes injection/SSRF surface for
  the demo. Routes are static (`generateStaticParams` + `dynamicParams = false`)
  so unknown slugs 404 rather than SSR arbitrary input.
- **User data stays in the browser.** Kitchen profile, shopping list, favorites
  and planner live under `tac.*.v1` keys in `localStorage` — never transmitted.
  The marketplace/allocation math is client-side only.
- **Markup hygiene.** Generated HTML is React-escaped; data seeds are developer
  authored, not user input. `aria-*` and keyboard patterns are audited via ESLint
  (`jsx-a11y` on during every lint gate).

## Known, deliberate constraints

- **NPM advisories (3)**: dev-only Prisma `mysql2` transitive advisories. Do NOT
  run `npm audit fix --force` (it would break the pinned Prisma toolchain). They
  touch no runtime path in this compiled static build.
- **No CSP yet.** The demo ships no inline-SRI policy; add a Content-Security-
  Policy header when a host becomes real (default-src 'self'), and re-measure.

## Before enabling live integrations

1. Auth: prefer short-lived signed tokens; never accept localStorage as identity.
2. Provider keys (grocery/video/model): server-side only, env-injected, rotated,
   and scoped per provider; log access but never the secrets.
3. Marketplace checkout: this demo's prices are seeded MOCKED values — a live
   checkout requires a payment provider contract, PCI hygiene, and price
   provenance (see governance POLICY.md).
4. Retest the locking gates (`npm run typecheck && npm run lint && npm test &&
   npm run build`) after every dependency change.