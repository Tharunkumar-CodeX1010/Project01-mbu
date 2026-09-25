"use client";

import { useMemo, useState } from "react";
import { DISHES, DISH_VEINS } from "@/lib/dishes";
import { DishCard } from "./dish-card";
import { getRegion } from "@/config/regions";
import { useLocation } from "@/components/location/location-store";
import { isLocationChosen, locationShortLabel } from "@/lib/location";

export function DishArchive() {
  const [query, setQuery] = useState("");
  const [vein, setVein] = useState<string>("all");
  const [localFirst, setLocalFirst] = useState(true);
  const location = useLocation();

  const localRegion = isLocationChosen(location)
    ? getRegion(location.regionSlug)
    : undefined;

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

  const ordered = useMemo(() => {
    if (!localRegion || !localFirst) return filtered;
    return [...filtered].sort((a, b) => {
      const rankA = a.region === localRegion.name ? 0 : a.vein === localRegion.vein ? 1 : 2;
      const rankB = b.region === localRegion.name ? 0 : b.vein === localRegion.vein ? 1 : 2;
      return rankA - rankB;
    });
  }, [filtered, localRegion, localFirst]);

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
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div role="group" aria-label="Filter by vein" className="flex flex-wrap gap-2">
          <VeinChip active={vein === "all"} onClick={() => setVein("all")}>
            All veins
          </VeinChip>
          {DISH_VEINS.map((slug) => (
            <VeinChip key={slug} active={vein === slug} onClick={() => setVein(slug)}>
              {slug.replace(/-/g, " ")}
            </VeinChip>
          ))}
        </div>
        {localRegion && localFirst ? (
          <button
            type="button"
            onClick={() => setLocalFirst(false)}
            className="border-edge text-ink-soft hover:text-ink rounded-full border px-3 py-1 text-xs transition-colors"
          >
            Dishes near {locationShortLabel(location)} first · clear
          </button>
        ) : null}
      </div>
      <p className="text-ink-faint mt-6 text-sm" aria-live="polite">
        {localRegion && localFirst && filtered.length > 0
          ? `Eating at ${locationShortLabel(location)} — ${ordered.length} dish${
              ordered.length === 1 ? "" : "es"
            } in the archive, nearby first.`
          : `${ordered.length} dish${ordered.length === 1 ? "" : "es"} in the archive`}
      </p>
      {ordered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ordered.map((dish) => (
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