import Link from "next/link";
import { Badge } from "@/components/ui";
import { MotionCard } from "@/components/motion/motion-card";
import { getVein } from "@/config/regions";
import type { Region } from "@/config/regions";

export function RegionCard({ region }: { region: Region }) {
  const vein = getVein(region.vein);

  return (
    <MotionCard>
      <Link
        href={`/explore/${region.slug}`}
        className="border-edge bg-surface shadow-glass group block rounded-lg p-5 transition-colors hover:bg-surface-strong"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-ink-faint text-xs font-medium uppercase tracking-[0.2em]">
              {region.country}
            </p>
            <h3 className="text-ink mt-1 text-xl font-semibold tracking-tight">
              {region.name}
            </h3>
          </div>
          <span aria-hidden="true" className="text-accent text-lg transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
        <p className="text-ink-soft mt-2 text-sm leading-relaxed">
          {region.tagline}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline">{vein.archetype}</Badge>
          {region.specialties.slice(0, 2).map((specialty) => (
            <Badge key={specialty} variant="neutral">
              {specialty}
            </Badge>
          ))}
        </div>
      </Link>
    </MotionCard>
  );
}