"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui";
import { INGREDIENTS } from "@/lib/ingredients";

export function IngredientLibrary() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INGREDIENTS;
    return INGREDIENTS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.family.toLowerCase().includes(q) ||
        item.flavor.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <label htmlFor="ingredient-search" className="sr-only">
        Search ingredients
      </label>
      <input
        id="ingredient-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ingredients, families, flavors…"
        className="border-edge bg-surface text-ink focus:border-accent placeholder:text-ink-faint h-12 w-full max-w-md rounded-lg border px-4 text-sm shadow-glass focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <p className="text-ink-faint mt-6 text-sm" aria-live="polite">
        {filtered.length} ingredient{filtered.length === 1 ? "" : "s"}
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ingredient) => {
          const open = expanded === ingredient.slug;
          return (
            <li
              key={ingredient.slug}
              className="border-edge bg-surface shadow-glass rounded-lg p-4"
            >
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setExpanded(open ? null : ingredient.slug)}
                className="w-full text-left"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-ink text-sm font-semibold">
                    {ingredient.name}
                  </span>
                  <span aria-hidden="true" className="text-accent">
                    {open ? "−" : "+"}
                  </span>
                </span>
                <span className="text-ink-faint mt-1 block text-xs uppercase tracking-[0.2em]">
                  {ingredient.family}
                </span>
              </button>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                {ingredient.flavor}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {ingredient.seasons.map((season) => (
                  <Badge key={season} variant="neutral">{season}</Badge>
                ))}
              </div>
              {open ? (
                <div className="accent-edge mt-3 border-t pt-3">
                  <p className="text-ink-soft text-sm leading-relaxed">
                    {ingredient.notes}
                  </p>
                  <p className="text-ink-faint mt-2 text-xs">
                    Storage: {ingredient.storage}
                  </p>
                  <p className="text-ink-faint mt-1 text-xs">
                    Goes with: {ingredient.goesWith.join(", ")}
                  </p>
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}