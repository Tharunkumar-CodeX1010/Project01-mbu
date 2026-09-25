import Link from "next/link";
import { Badge } from "@/components/ui";
import type { Dish } from "@/lib/dishes";
import { posterForRecipe } from "@/lib/poster";
import { foodImageForRecipe } from "@/lib/food-images";
import { PosterImage } from "@/components/media/poster-image";

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <Link
      href={`/recipes/${dish.slug}`}
      className="border-edge bg-surface shadow-card group flex h-full flex-col overflow-hidden rounded-xl transition-shadow hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <PosterImage
          src={foodImageForRecipe(dish.slug) ?? posterForRecipe(dish.slug)}
          fallback={posterForRecipe(dish.slug)}
          alt={`Dish poster for ${dish.name}`}
        />
        <span className="bg-elevated/90 absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium uppercase tracking-[0.15em] text-ink-soft backdrop-blur-sm">
          {dish.archetype || dish.region}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-ink text-base font-semibold tracking-tight">
          {dish.name}
        </h3>
        <p className="text-ink-soft mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed">
          {dish.blurb}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline">{dish.region}</Badge>
            <Badge variant="neutral">{dish.timeMin} min</Badge>
          </div>
          <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}