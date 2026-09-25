"use client";

import { RECIPES } from "@/config/recipes";
import { getRegion, getVein } from "@/config/regions";
import { isLocationChosen, locationShortLabel } from "@/lib/location";
import { useLocation } from "./location-store";
import { posterForRegion } from "@/lib/poster";
import { foodImageForRegion } from "@/lib/food-images";
import { PosterImage } from "@/components/media/poster-image";
import { Button, Badge } from "@/components/ui";
import { RecipeCard } from "@/components/recipe/recipe-card";

/** Homepage personalization: food items set to the chosen place. */
export function LocalBand() {
  const location = useLocation();

  if (!isLocationChosen(location)) return null;

  const region = getRegion(location.regionSlug);
  if (!region) return null;

  const vein = getVein(region.vein);
  const localRecipes = RECIPES.filter(
    (recipe) => recipe.regionSlug === region.slug
  ).slice(0, 3);

  return (
    <section aria-label={`Feasting near ${region.name}`} className="border-edge border-b bg-elevated/40">
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-12 sm:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-edge shadow-card">
            <PosterImage
              src={foodImageForRegion(region.slug) ?? posterForRegion(region.slug)}
              fallback={posterForRegion(region.slug)}
              alt={`Poster of ${region.name}`}
            />
            <span className="bg-elevated/90 absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-medium text-ink-soft backdrop-blur-sm">
              Tuned to your location
            </span>
          </div>

          <div>
            <p className="text-accent text-xs font-medium uppercase tracking-[0.3em]">
              {vein.name} · {region.country}
            </p>
            <h2 className="text-ink mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Feasting near {region.name}
            </h2>
            <p className="text-ink-soft mt-3 max-w-xl text-base leading-relaxed">
              {region.tagline}. {region.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="orange">{vein.archetype}</Badge>
              <Badge variant="green">
                Where you eat: {locationShortLabel(location)}
              </Badge>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={`/recipes?region=${region.slug}`}>
                {conductLabel(localRecipes.length, region.name)}
              </Button>
              <Button href={`/explore/${region.slug}`} variant="glass">
                Open {region.name} atlas
              </Button>
            </div>
          </div>
        </div>

        {localRecipes.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {localRecipes.map((recipe) => (
              <RecipeCard key={recipe.slug} recipe={recipe} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function conductLabel(count: number, name: string): string {
  if (count === 0) return `Masterclasses from ${name}`;
  return `${count} ${count === 1 ? "masterclass" : "masterclasses"} near ${name}`;
}