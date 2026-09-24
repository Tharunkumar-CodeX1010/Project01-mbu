# PROJECT TAC — The Art of Cooking

**Consumer product: YUMMYGO** — a cinematic, AI-native culinary intelligence platform.

> Discover food. Understand its story. Learn to cook it. Adapt it to your kitchen. Find what you need. Shop intelligently.

## What this is

YUMMYGO is a modular, testable, AI-native culinary ecosystem that connects the domains a normal recipe
site keeps separate:

```
Recipes ↔ Ingredients ↔ Kitchen ↔ Dish ↔ History ↔ Culinary Art ↔ Products ↔ Marketplace ↔ AI
```

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + centralized design tokens |
| Data model | Prisma schema (validated; live DB is a BLOCKED external dependency in this workspace) |
| Runtime data | Typed static seed modules under `data/` |
| Tests | Vitest (+ React Testing Library / Playwright as needed) |
| Motion | Framer Motion (planned; respects `prefers-reduced-motion`) |
| Validation | Zod (as needed at service boundaries) |

## Repository layout

```
app/          Next.js App Router routes
components/   UI primitives + domain components
lib/          types, tokens, arithmetic engines (servings, units, normalization)
services/     provider adapters (grocery, video), search, location, price, optimizer
api/          route handlers / API contracts
data/         seeded regions, cuisines, dishes, recipes, history, knowledge, products
tests/        unit / component tests
scripts/      seeders, content publish, governance helpers
docs/         architecture + engineering protocol + reports
config/       central application configuration
styles/       design tokens (build, theme)
prisma/       domain schema (PostgreSQL target)
```

## Truth-status taxonomy

The engineering protocol requires every deliverable to be labelled truthfully. Never convert a mock into
"live", or a target into a measured result.

```
IMPLEMENTED          code exists and runs
VERIFIED             an actual check (test/build/lint/scan) passed
MEASURED             a real number was observed (e.g. Lighthouse)
MOCKED               simulated integration, clearly labelled in the UI
SIMULATED            deterministic stand-in behaviour
EXTERNAL_DEPENDENCY  requires a service not available here (Postgres, Redis, live providers)
NOT IMPLEMENTED      intentionally not built
BLOCKED              attempted but impossible in this environment
```

## 30-section build protocol

Each section follows: **Build → Verify → Fix → Commit → Push → Confirm → Continue.**

Done so far:

| # | Section | Status | Commit |
| --- | --- | --- | --- |
| 01 | Repository Foundation | IMPLEMENTED | (this commit) |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Quality gates:

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run prisma:validate
```

## Environment

Copy `.env.example` to `.env.local` only if enabling live integrations. Never commit real secrets —
`.env*` is Git-ignored while `.env.example` is committed by exception.