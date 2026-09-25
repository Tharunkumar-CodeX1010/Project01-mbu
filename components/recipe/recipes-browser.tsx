"use client";

import { useMemo, useState } from "react";
import { SearchBar } from "@/components/ui";
import { RecipeCard } from "./recipe-card";
import type { Recipe } from "@/config/recipes";
import { rankRecipes, type RankMode } from "@/lib/ranking";

interface RecipesBrowserProps {
  recipes: Recipe[];
  regions: Array<{ slug: string; name: string }>;
  initialRegion?: string;
}

const MODES: Array<{ id: RankMode | "none"; label: string }> = [
  { id: "none", label: "Order: default" },
  { id: "relevance", label: "Best match" },
  { id: "quickest", label: "Quickest cook" },
  { id: "family", label: "Feeds the most" },
  { id: "region", label: "By atlas" },
];

export function RecipesBrowser({
  recipes,
  regions,
  initialRegion,
}: RecipesBrowserProps) {
  const [query, setQuery] = useState("");
  const [regionSlug, setRegionSlug] = useState(initialRegion ?? "all");
  const [mode, setMode] = useState<RankMode | "none">("none");

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

  const ranked = useMemo(
    () => (mode === "none" ? [] : rankRecipes(query, mode)),
    [mode, query]
  );

  const ordered = useMemo(() => {
    let list = filtered;
    if (ranked.length > 0) {
      const scores = new Map(ranked.map((recipe) => [recipe.slug, recipe.score]));
      list = [...list].sort(
        (a, b) => (scores.get(b.slug) ?? 0) - (scores.get(a.slug) ?? 0)
      );
      if (mode === "relevance" && query.trim().length > 0) {
        list = list.filter((recipe) => (scores.get(recipe.slug) ?? 0) > 0);
      }
    }
    return list;
  }, [filtered, ranked, mode, query]);

  const topReason =
    ranked.length > 0 ? (ranked[0].reasons[0] ?? "") : "";

  const regionsWithRecipes = useMemo(
    () =>
      regions.filter((region) =>
        recipes.some((recipe) => recipe.regionSlug === region.slug)
      ),
    [regions, recipes]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <SearchBar
          placeholder="Search masterclasses…"
          value={query}
          onChange={setQuery}
          onSearch={setQuery}
          label="Search recipes"
          className="max-w-md"
        />
        <label htmlFor="rank-mode" className="sr-only">
          Order results
        </label>
        <select
          id="rank-mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as RankMode | "none")}
          className="border-edge bg-elevated focus:border-accent text-ink h-10 rounded-lg border px-3 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {MODES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
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
        {ordered.length} masterclass{ordered.length === 1 ? "" : "es"}
        {topReason ? (
          <span className="text-accent"> · best: {topReason}</span>
        ) : null}
      </p>
      {ordered.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((recipe) => (
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