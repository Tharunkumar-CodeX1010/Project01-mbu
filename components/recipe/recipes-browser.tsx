"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "@/components/ui";
import { RecipeCard } from "./recipe-card";
import type { Recipe } from "@/config/recipes";

interface RecipesBrowserProps {
  recipes: Recipe[];
  regions: Array<{ slug: string; name: string }>;
  initialRegion?: string;
}

export function RecipesBrowser({
  recipes,
  regions,
  initialRegion,
}: RecipesBrowserProps) {
  const [query, setQuery] = useState("");
  const [regionSlug, setRegionSlug] = useState(initialRegion ?? "all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery =
        q.length === 0 ||
        recipe.name.toLowerCase().includes(q) ||
        recipe.blurb.toLowerCase().includes(q);
      const matchesRegion =
        regionSlug === "all" || recipe.regionSlug === regionSlug;
      return matchesQuery && matchesRegion;
    });
  }, [query, regionSlug, recipes]);

  const regionsWithRecipes = useMemo(
    () =>
      regions.filter((region) =>
        recipes.some((recipe) => recipe.regionSlug === region.slug)
      ),
    [regions, recipes]
  );

  return (
    <div>
      <SearchBar
        placeholder="Search masterclasses…"
        value={query}
        onChange={setQuery}
        onSearch={setQuery}
        label="Search recipes"
        className="max-w-md"
      />
      <div
        role="group"
        aria-label="Filter by region"
        className="mt-4 flex flex-wrap gap-2"
      >
        <RegionChip active={regionSlug === "all"} onClick={() => setRegionSlug("all")}>
          All regions
        </RegionChip>
        {regionsWithRecipes.map((region) => (
          <RegionChip
            key={region.slug}
            active={regionSlug === region.slug}
            onClick={() => setRegionSlug(region.slug)}
          >
            {region.name}
          </RegionChip>
        ))}
      </div>
      <p className="text-ink-faint mt-6 text-sm" aria-live="polite">
        {filtered.length} masterclass{filtered.length === 1 ? "" : "es"}
      </p>
      {filtered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </div>
      ) : (
        <p className="text-ink-soft mt-8 text-sm">
          Nothing matches — try a different search or clear the region filter.
        </p>
      )}
    </div>
  );
}

function RegionChip({
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
          : "border-edge text-ink-soft rounded-full border px-3 py-1 text-xs font-medium transition-colors hover:border-edge-strong hover:text-ink"
      }
    >
      {children}
    </button>
  );
}