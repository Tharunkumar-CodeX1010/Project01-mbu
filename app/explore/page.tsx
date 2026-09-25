import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { ConstellationMap } from "@/components/region/constellation-map";
import { RegionCard } from "@/components/region/region-card";
import { VEINS, regionsByVein } from "@/config/regions";

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
        <Reveal>
          <ConstellationMap />
        </Reveal>
      </section>
      <div className="mt-14 space-y-12">
        {VEINS.map((vein) => {
          const regions = regionsForVein(vein.slug);
          if (regions.length === 0) return null;
          return (
            <section key={vein.slug} aria-labelledby={`vein-${vein.slug}`}>
              <Reveal>
                <div className="mb-5">
                  <h2
                    id={`vein-${vein.slug}`}
                    className="text-ink text-2xl font-bold tracking-tight"
                  >
                    {vein.name}
                  </h2>
                  <p className="text-ink-soft mt-1 text-sm">
                    <span className="text-accent font-semibold">
                      {vein.archetype}
                    </span>{" "}
                    — {vein.oneLiner}
                  </p>
                </div>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {regions.map((region, index) => (
                  <Reveal key={region.slug} delay={index * 0.05}>
                    <RegionCard region={region} />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}