import Link from "next/link";
import { Badge } from "@/components/ui";
import { getRegion } from "@/config/regions";
import type { Recipe } from "@/config/recipes";
import { posterForRecipe } from "@/lib/poster";
import { foodImageForRecipe } from "@/lib/food-images";
import { PosterImage } from "@/components/media/poster-image";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const region = getRegion(recipe.regionSlug);

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="border-edge bg-surface shadow-card group flex h-full flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <PosterImage
          src={foodImageForRecipe(recipe.slug) ?? posterForRecipe(recipe.slug)}
          fallback={posterForRecipe(recipe.slug)}
          alt={`Masterclass poster for ${recipe.name}`}
        />
        <span className="bg-accent/90 text-accent-ink absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold">
          {region?.name ?? recipe.regionSlug}
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-elevated/90 px-2.5 py-0.5 text-xs font-medium text-ink-soft backdrop-blur-sm">
          {recipe.timeMin} min
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-ink text-lg font-semibold tracking-tight">
          {recipe.name}
        </h3>
        <p className="text-ink-soft mt-2 flex-1 text-sm leading-relaxed">
          {recipe.blurb}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <Badge variant="neutral">{recipe.difficulty}</Badge>
            <Badge variant="neutral">{recipe.servings} serves</Badge>
          </div>
          <span
            aria-hidden="true"
            className="text-accent transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}