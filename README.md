# PROJECT TAC — The Art of Cooking

**Consumer product: YUMMYGO** — a cinematic, AI-native culinary intelligence platform.

> Discover food. Understand its story. Learn to cook it. Adapt it to your kitchen. Find what you need. Shop intelligently.

## What this is

YUMMYGO is a modular, testable, AI-native culinary ecosystem that connects the domains a normal recipe
site keeps separate:

```
Recipes ↔ Ingredients ↔ Kitchen ↔ Dish ↔ History ↔ Culinary Art ↔ Products ↔ Marketplace ↔ AI
```

## Stack (as built)

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 4 + centralized design tokens |
| Data model | Prisma schema (validated; live DB is BLOCKED_EXTERNAL_DEPENDENCY in this workspace) |
| Runtime data | Typed static seed modules under `config/` + `lib/` (no live DB required) |
| Tests | Vitest 5 (+ React Testing Library + jsdom) — 56 tests green |
| Motion | Framer Motion 13, respects `prefers-reduced-motion` globally |
| Video/imagery | Procedural SVG posters; encoded video BLOCKED_EXTERNAL_DEPENDENCY |

## Repository layout

```
app/          Next.js App Router routes (all data pages static by construction)
components/   UI primitives + domain components (assistant, collection, hero, motion, …)
config/       recipes(16), regions(16/8 veins), site nav, hero content
lib/          engines: kitchen, shopping, collections, converter, substitutions,
              dishes, history, techniques, ingredients, ranking, media, planner,
              location, assistant, transcripts, governance, protocols, marketplace
tests/        unit + component tests (56)
docs/         ENGINEERING, PERFORMANCE, SECURITY, governance policy & protocols
styles/       design tokens (build, theme)
prisma/       domain schema (PostgreSQL target; schema-only)
public/media/ procedural SVG posters (hero, history)
```

## Truth-status taxonomy

```
IMPLEMENTED          code exists and runs
VERIFIED             an actual check (test/build/lint/scan) passed
MEASURED             a real number was observed (see docs/PERFORMANCE.md)
MOCKED               simulated integration, clearly labelled in the UI
SIMULATED            deterministic stand-in behaviour
EXTERNAL_DEPENDENCY  requires a service not available here (Postgres, Redis, live providers)
NOT IMPLEMENTED      intentionally not built
BLOCKED              attempted but impossible in this environment
```

Project-specific blocked items (never mislabelled):

- Live Postgres / Redis, grocery & provider APIs, YouTube keys, hosted model — `BLOCKED_EXTERNAL_DEPENDENCY`
- All UI surfaces say so (EpisodeCard, Marketplace simulator, Assistant, governance module).

## 30-section build protocol

Each section followed: **Build → Verify → Fix → Commit → Push → Confirm → Continue.**

| # | Section | Status (this workspace) |
| --- | --- | --- |
| 01 | Repository foundation | IMPLEMENTED + VERIFIED |
| 02 | App skeleton + theme system | IMPLEMENTED + VERIFIED |
| 03 | Shared UI kit | IMPLEMENTED + VERIFIED |
| 04 | Hero section + brand identity | IMPLEMENTED + VERIFIED |
| 05 | Routing tree + 404 experience | IMPLEMENTED + VERIFIED |
| 06 | Cinematic hero + opener | IMPLEMENTED + VERIFIED |
| 07 | Motion engine | IMPLEMENTED + VERIFIED |
| 08 | Regional discovery core | IMPLEMENTED + VERIFIED |
| 09 | Recipe index + masterclasses | IMPLEMENTED + VERIFIED |
| 10 | Kitchen profile | IMPLEMENTED + VERIFIED |
| 11 | Dish archive | IMPLEMENTED + VERIFIED |
| 12 | Shopping list | IMPLEMENTED + VERIFIED |
| 13 | Favorites + fork collection | IMPLEMENTED + VERIFIED |
| 14 | Converter & substitution | IMPLEMENTED + VERIFIED |
| 15 | Food-history film engine | IMPLEMENTED + VERIFIED |
| 16 | Ingredient intelligence | IMPLEMENTED + VERIFIED |
| 17 | Culinary-art hub | IMPLEMENTED + VERIFIED |
| 18 | Video/imagery pipeline | MOCKED (contract implemented; media blocked) |
| 19 | Meal & pantry planner | IMPLEMENTED + VERIFIED |
| 20 | Marketplace architecture | MOCKED (split-cart demo; live APIs blocked) |
| 21 | Performance core | MEASURED (see docs/PERFORMANCE.md, 83 KB gzip/13 routes) |
| 22 | Browsing, search & ranking | IMPLEMENTED + VERIFIED |
| 23 | URL state & annotations | IMPLEMENTED + VERIFIED |
| 24 | Location intelligence | IMPLEMENTED (device-clock only, no GPS) + VERIFIED |
| 25 | AI assistant | MOCKED adapter (deterministic over live datasets) |
| 26 | TAC-video autoplay UX | SIMULATED (autoplay rail; footage blocked) |
| 27 | Transcript engine | IMPLEMENTED (derived from real steps) + VERIFIED |
| 28 | Model training governance | IMPLEMENTED (policy + invariants) + VERIFIED |
| 29 | Ensemble system prompts | IMPLEMENTED + VERIFIED |
| 30 | Security, performance & closure | VERIFIED (see docs/SECURITY.md, PERFORMANCE.md, this file) |

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

Manual route smoke test after `npm run build`:

```bash
npx next start
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/recipes/pizza-napoletana
```

## Environment

Copy `.env.example` to `.env.local` only if enabling live integrations. Never commit real secrets —
`.env*` is Git-ignored while `.env.example` is committed by exception.