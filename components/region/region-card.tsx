import Link from "next/link";
import { Badge } from "@/components/ui";
import { getVein } from "@/config/regions";
import type { Region } from "@/config/regions";
import { posterForRegion } from "@/lib/poster";
import { foodImageForRegion } from "@/lib/food-images";
import { PosterImage } from "@/components/media/poster-image";

export function RegionCard({ region }: { region: Region }) {
  const vein = getVein(region.vein);

  return (
    <Link
      href={`/explore/${region.slug}`}
      className="border-edge bg-surface shadow-card group relative block h-full overflow-hidden rounded-xl transition-shadow hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <PosterImage
          src={foodImageForRegion(region.slug) ?? posterForRegion(region.slug)}
          fallback={posterForRegion(region.slug)}
          alt={`Regional poster of ${region.name}`}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas/90 to-transparent p-4 pt-10">
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
        </div>
      </div>
      <div className="p-5">
        <p className="text-ink-soft text-sm leading-relaxed">
          {region.tagline}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="orange">{vein.archetype}</Badge>
          {region.specialties.slice(0, 2).map((specialty) => (
            <Badge key={specialty} variant="neutral">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}