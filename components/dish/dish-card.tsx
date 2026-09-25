import Link from "next/link";
import { Badge } from "@/components/ui";
import { MotionCard } from "@/components/motion/motion-card";
import type { Dish } from "@/lib/dishes";

export function DishCard({ dish }: { dish: Dish }) {
  return (
    <MotionCard className="h-full">
      <Link
        href={`/recipes/${dish.slug}`}
        className="border-edge bg-surface shadow-glass group flex h-full flex-col rounded-lg p-4 transition-colors hover:bg-surface-strong"
      >
        <p className="text-accent text-[0.65rem] font-medium uppercase tracking-[0.25em]">
          {dish.archetype || dish.region}
        </p>
        <h3 className="text-ink mt-1.5 text-base font-semibold tracking-tight">
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
      </Link>
    </MotionCard>
  );
}