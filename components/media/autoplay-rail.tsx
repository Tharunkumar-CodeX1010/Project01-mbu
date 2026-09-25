"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui";
import { RECIPES, type Recipe } from "@/config/recipes";
import { mediaFor } from "@/lib/media";

/** Simulated episode rail: no real video. Autoplay advances on a timer and
 *  pauses for prefers-reduced-motion or hidden tabs. */
export function AutoplayRail({ recipeSlugs, title = "Keep watching" }: { recipeSlugs: string[]; title?: string }) {
  const picks = recipeSlugs
    .map((slug) => RECIPES.find((recipe) => recipe.slug === slug))
    .filter((recipe): recipe is Recipe => Boolean(recipe))
    .slice(0, 5);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const timer = setInterval(() => {
      setActive((value) => (value + 1) % picks.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [picks.length]);

  if (picks.length === 0) return null;

  return (
    <section aria-label={title} className="mt-14">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-ink text-xl font-semibold tracking-tight">{title}</h2>
        <Badge variant="orange">simulated autoplay</Badge>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {picks.map((recipe, index) => {
          const media = mediaFor(recipe.slug, recipe.timeMin);
          const isActive = index === active % picks.length;
          return (
            <a
              key={recipe.slug}
              href={`/recipes/${recipe.slug}`}
              aria-current={isActive ? "true" : undefined}
              className={`border-edge rounded-lg p-3 transition-colors ${
                isActive
                  ? "border-accent bg-surface shadow-glow-orange"
                  : "bg-surface hover:border-edge-strong shadow-glass"
              }`}
            >
              <div
                className="border-edge h-20 w-full rounded-md bg-cover bg-center border"
                style={{ backgroundImage: `url(${media.posterSrc})` }}
              />
              <p className="text-ink mt-2 line-clamp-1 text-sm font-medium">
                {recipe.name}
              </p>
              <p className="text-ink-faint text-xs">{recipe.timeMin} min</p>
              {isActive ? (
                <p className="text-accent mt-1 text-[11px] font-medium">
                  ▸ now autoplaying (mock)
                </p>
              ) : null}
            </a>
          );
        })}
      </div>
      <p className="text-ink-faint mt-3 text-xs">
        Autoplay is simulated — encoded episodes are BLOCKED_EXTERNAL_DEPENDENCY.
        Reduced-motion users get a static rail.
      </p>
    </section>
  );
}