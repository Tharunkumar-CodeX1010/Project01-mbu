"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui";
import { TECHNIQUES, TECHNIQUE_CATEGORIES } from "@/lib/techniques";
import { getRecipe } from "@/config/recipes";

export function CulinaryArtHub() {
  const [category, setCategory] = useState<string>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      category === "all"
        ? TECHNIQUES
        : TECHNIQUES.filter((technique) => technique.category === category),
    [category]
  );

  return (
    <div>
      <div role="group" aria-label="Filter techniques by category" className="flex flex-wrap gap-2">
        <Chip active={category === "all"} onClick={() => setCategory("all")}>
          All
        </Chip>
        {TECHNIQUE_CATEGORIES.map((cat) => (
          <Chip key={cat} active={category === cat} onClick={() => setCategory(cat)}>
            {cat}
          </Chip>
        ))}
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((technique) => {
          const open = expanded === technique.slug;
          return (
            <li key={technique.slug} className="border-edge bg-surface shadow-glass rounded-lg p-4">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setExpanded(open ? null : technique.slug)}
                className="w-full text-left"
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-ink text-sm font-semibold">
                    {technique.name}
                  </span>
                  <span aria-hidden="true" className="text-accent">
                    {open ? "−" : "+"}
                  </span>
                </span>
              </button>
              <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                {technique.summary}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Badge variant="outline">{technique.category}</Badge>
                <Badge variant="neutral">{technique.skill}</Badge>
                <Badge variant="neutral">{technique.minutes} min</Badge>
              </div>
              {open ? (
                <div className="border-edge mt-3 border-t pt-3">
                  <p className="text-ink-soft text-sm leading-relaxed">
                    {technique.detail}
                  </p>
                  {technique.relatedDishes.length > 0 ? (
                    <p className="text-ink-faint mt-2 text-xs">
                      Practice in:{" "}
                      {technique.relatedDishes.map((slug, index) => {
                        const recipe = getRecipe(slug);
                        return (
                          <a
                            key={slug}
                            href={`/recipes/${slug}`}
                            className="text-accent hover:underline"
                          >
                            {recipe?.name ?? slug}
                            {index < technique.relatedDishes.length - 1 ? ", " : ""}
                          </a>
                        );
                      })}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
      <p className="text-ink-faint mt-6 text-xs">
        Technique video demonstrations are MOCKED in this build; steps and
        practice recipes are live.
      </p>
    </div>
  );
}

function Chip({
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
      aria-pressed={active}
      onClick={onClick}
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