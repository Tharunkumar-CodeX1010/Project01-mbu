import Link from "next/link";
import { Badge } from "@/components/ui";
import { MotionCard } from "@/components/motion/motion-card";
import { getRegion } from "@/config/regions";
import type { Recipe } from "@/config/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  const region = getRegion(recipe.regionSlug);

  return (
    <MotionCard className="h-full">
      <Link
        href={`/recipes/${recipe.slug}`}
        className="border-edge bg-surface shadow-glass group flex h-full flex-col rounded-lg p-5 transition-colors hover:bg-surface-strong"
      >
        <div className="flex items-center justify-between gap-3">
          <Badge variant="outline">{region?.name ?? recipe.regionSlug}</Badge>
          <span className="text-ink-faint text-xs">{recipe.timeMin} min</span>
        </div>
        <h3 className="text-ink mt-3 text-lg font-semibold tracking-tight">
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
      </Link>
    </MotionCard>
  );
}