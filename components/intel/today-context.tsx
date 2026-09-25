"use client";

import { useSyncExternalStore } from "react";
import { Badge } from "@/components/ui";
import {
  minuteServerSnapshot,
  minuteSnapshot,
  subscribeToMinute,
  todayContext,
} from "@/lib/location";
import { VEINS } from "@/config/regions";
import { rankRecipes } from "@/lib/ranking";

export function TodayContext() {
  const now = useSyncExternalStore(
    subscribeToMinute,
    minuteSnapshot,
    minuteServerSnapshot
  );
  const context = todayContext(new Date(now));

  const quick = rankRecipes("", "quickest").slice(0, 3);

  return (
    <div className="border-edge bg-surface shadow-glass rounded-lg p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-ink text-lg font-semibold tracking-tight">
            Today&apos;s context
          </h2>
          <p className="text-ink-faint mt-1 text-xs">
            No GPS, no location sharing — just your device clock and timezone.
          </p>
        </div>
        <Badge variant="outline">{context.timezone}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div>
          <p className="text-ink-faint text-xs uppercase tracking-[0.2em]">
            Moment
          </p>
          <p className="text-accent mt-1 font-medium">{context.moment}</p>
        </div>
        <div>
          <p className="text-ink-faint text-xs uppercase tracking-[0.2em]">
            Season
          </p>
          <p className="text-ink mt-1">{context.season}</p>
        </div>
        <div>
          <p className="text-ink-faint text-xs uppercase tracking-[0.2em]">
            Local hour
          </p>
          <p className="text-ink mt-1">{context.localHour}:00</p>
        </div>
      </div>

      <p className="text-ink-soft mt-4 text-sm leading-relaxed">
        The kitchen wants <span className="text-accent">{context.suggestion}</span>
        {context.pickReason ? (
          <span className="text-ink-faint"> — {context.pickReason}</span>
        ) : null}
      </p>

      <div className="accent-edge mt-4 border-t pt-4">
        <p className="text-ink-faint text-xs uppercase tracking-[0.2em]">
          Eight veins to choose from
        </p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {VEINS.map((vein) => (
            <a
              key={vein.slug}
              href={`/explore#${vein.slug}`}
              className="border-edge text-ink-soft hover:border-accent hover:text-ink rounded-full border px-3 py-1 text-xs transition-colors"
            >
              {vein.name}
            </a>
          ))}
        </div>
      </div>

      {quick.length > 0 ? (
        <div className="accent-edge mt-3 border-t pt-4">
          <p className="text-ink-faint text-xs uppercase tracking-[0.2em]">
            Ready in under 30 minutes
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {quick.map((recipe) => (
              <a
                key={recipe.slug}
                href={`/recipes/${recipe.slug}`}
                className="bg-accent text-accent-ink rounded-full px-3 py-1 text-xs font-medium"
              >
                {recipe.name}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}