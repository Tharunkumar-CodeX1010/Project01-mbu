"use client";

import { useMemo, useState } from "react";
import { DISHES, DISH_VEINS } from "@/lib/dishes";
import { DishCard } from "./dish-card";

export function DishArchive() {
  const [query, setQuery] = useState("");
  const [vein, setVein] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DISHES.filter((dish) => {
      const matchesQuery =
        q.length === 0 ||
        dish.name.toLowerCase().includes(q) ||
        dish.blurb.toLowerCase().includes(q) ||
        dish.region.toLowerCase().includes(q);
      const matchesVein = vein === "all" || dish.vein === vein;
      return matchesQuery && matchesVein;
    });
  }, [query, vein]);

  return (
    <div>
      <label htmlFor="dish-search" className="sr-only">
        Search dishes
      </label>
      <input
        id="dish-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search dishes, regions, techniques…"
        className="border-edge bg-surface text-ink focus:border-accent placeholder:text-ink-faint h-12 w-full max-w-md rounded-lg border px-4 text-sm shadow-glass focus:outline-none focus:ring-1 focus:ring-accent"
      />
      <div role="group" aria-label="Filter by vein" className="mt-4 flex flex-wrap gap-2">
        <VeinChip active={vein === "all"} onClick={() => setVein("all")}>
          All veins
        </VeinChip>
        {DISH_VEINS.map((slug) => (
          <VeinChip key={slug} active={vein === slug} onClick={() => setVein(slug)}>
            {slug.replace(/-/g, " ")}
          </VeinChip>
        ))}
      </div>
      <p className="text-ink-faint mt-6 text-sm" aria-live="polite">
        {filtered.length} dish{filtered.length === 1 ? "" : "es"} in the archive
      </p>
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((dish) => (
            <DishCard key={dish.slug} dish={dish} />
          ))}
        </div>
      ) : (
        <p className="text-ink-soft mt-8 text-sm">
          No dishes match that search — try another name or clear the vein filter.
        </p>
      )}
    </div>
  );
}

function VeinChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        active
          ? "bg-accent text-accent-ink rounded-full px-3 py-1 text-xs font-medium"
          : "border-edge text-ink-soft rounded-full border px-3 py-1 text-xs transition-colors hover:border-edge-strong hover:text-ink"
      }
    >
      {children}
    </button>
  );
}