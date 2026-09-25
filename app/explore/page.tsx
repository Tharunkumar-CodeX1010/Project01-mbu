import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { ConstellationMap } from "@/components/region/constellation-map";
import { RegionCard } from "@/components/region/region-card";
import { PosterImage } from "@/components/media/poster-image";
import { VEINS, regionsByVein } from "@/config/regions";
import { posterForVein } from "@/lib/poster";
import { foodImageForVein } from "@/lib/food-images";

export const metadata: Metadata = { title: "Explore" };

function regionsForVein(slug: string) {
  return regionsByVein(slug as Parameters<typeof regionsByVein>[0]);
}

export default function ExplorePage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Explore"
        title="The 8 Culinary Veins of Planet Earth"
        description="Sixteen cities where food became identity. Enter a region to read its story — origin, transformation, recognition."
      />
      <section aria-label="Region atlas" className="mt-8">
        <ConstellationMap />
      </section>
      <div className="mt-14 space-y-14">
        {VEINS.map((vein) => {
          const regions = regionsForVein(vein.slug);
          if (regions.length === 0) return null;
          return (
            <section key={vein.slug} aria-labelledby={`vein-${vein.slug}`}>
              <div className="relative mb-6 aspect-[21/9] w-full overflow-hidden rounded-2xl border border-edge shadow-card sm:aspect-[3/1]">
                <PosterImage
                  src={foodImageForVein(vein.slug) ?? posterForVein(vein.slug)}
                  fallback={posterForVein(vein.slug)}
                  alt={`Vein poster of ${vein.name}`}
                />
                <div className="from-canvas/90 absolute inset-0 bg-gradient-to-r to-transparent" />
                <div
                  id={`vein-${vein.slug}`}
                  className="absolute inset-y-0 flex max-w-xl flex-col justify-center px-6 sm:px-10"
                >
                  <p className="text-accent text-xs font-semibold uppercase tracking-[0.25em]">
                    {vein.archetype}
                  </p>
                  <h2 className="text-ink mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                    {vein.name}
                  </h2>
                  <p className="text-ink-soft mt-1 text-sm sm:text-base">
                    {vein.oneLiner}
                  </p>
                </div>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {regions.map((region) => (
                  <RegionCard key={region.slug} region={region} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}