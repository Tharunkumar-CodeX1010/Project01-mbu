"use client";

import { useSyncExternalStore } from "react";
import { Badge } from "@/components/ui";
import { EMPTY_WEEK, WEEK_DAYS, aggregatePlan, planStats, readPlan, writePlan } from "@/lib/planner";
import { RECIPES } from "@/config/recipes";
import { deserialize, serialize, shoppingStorageKey } from "@/lib/shopping";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

let cached: ReturnType<typeof readPlan> | null = null;

function getSnapshot() {
  if (!cached) cached = readPlan();
  return cached;
}

function getServerSnapshot() {
  return readPlan();
}

function commit(next: ReturnType<typeof readPlan>) {
  cached = next;
  writePlan(next);
}

export function MealPlanner() {
  const plan = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const stats = planStats(plan);

  const setDay = (day: (typeof WEEK_DAYS)[number], slug: string) => {
    commit({ ...readPlan(), [day]: slug === "none" ? null : slug });
  };

  const clearWeek = () => commit({ ...readPlan(), ...EMPTY_WEEK });

  const items = aggregatePlan(plan);

  const addAllToShopping = () => {
    const shoppingKey = shoppingStorageKey();
    try {
      const existing = window.localStorage.getItem(shoppingKey);
      const parsed = existing ? deserialize(existing) : [];
      const next = [
        ...parsed,
        ...items.flatMap((item, index) =>
          item.recipes.map((recipe) => ({
            id: `plan:${index}:${item.item}:${recipe}`,
            ingredient: item.item,
            qty: item.qty,
            recipe,
            checked: false,
          }))
        ),
      ];
      window.localStorage.setItem(shoppingKey, serialize(next));
    } catch {
      // private mode
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-ink-soft text-sm">
          {stats.filled} of {stats.total} evenings planned
        </p>
        <button
          type="button"
          onClick={clearWeek}
          className="border-edge text-ink-soft hover:text-ink rounded-lg border px-3 py-1.5 text-xs"
        >
          Clear week
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {WEEK_DAYS.map((day) => {
          const slug = plan[day];
          const recipe = slug ? RECIPES.find((r) => r.slug === slug) : null;
          return (
            <div key={day} className="border-edge bg-surface shadow-glass rounded-lg p-4">
              <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em]">
                {day}
              </p>
              <label htmlFor={`day-${day}`} className="sr-only">
                Dish for {day}
              </label>
              <select
                id={`day-${day}`}
                value={slug ?? "none"}
                onChange={(e) => setDay(day, e.target.value)}
                className="border-edge bg-elevated focus:border-accent text-ink mt-2 h-10 w-full rounded-lg border px-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="none">— off —</option>
                {RECIPES.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.name}
                  </option>
                ))}
              </select>
              {recipe ? (
                <div className="mt-2 flex gap-1.5">
                  <Badge variant="neutral">{recipe.timeMin} min</Badge>
                  <Badge variant="neutral">{recipe.servings} serves</Badge>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="border-edge bg-surface shadow-glass mt-8 rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-ink text-lg font-semibold tracking-tight">
            Week grocery aggregate
          </h2>
          <button
            type="button"
            onClick={addAllToShopping}
            disabled={items.length === 0}
            className="bg-accent text-accent-ink shadow-glow-orange h-10 rounded-lg px-4 text-sm font-medium transition-colors hover:bg-accent-strong disabled:opacity-40"
          >
            Add all to shopping list
          </button>
        </div>
        {items.length > 0 ? (
          <ul className="mt-4 space-y-1.5">
            {items.map((item) => (
              <li key={item.item} className="flex justify-between gap-4 text-sm">
                <span className="text-ink-soft">
                  {item.item}
                  <span className="text-ink-faint block text-xs">
                    {item.recipes.join(", ")}
                  </span>
                </span>
                <span className="text-accent font-medium">{item.qty}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink-faint mt-4 text-sm">
            Plan some evenings and the aggregate appears here.
          </p>
        )}
      </div>

      <p className="text-ink-faint mt-6 text-xs">
        Plan saved locally in this browser. Pantry-aware suggestion logic is
        future work; picks are yours.
      </p>
    </div>
  );
}