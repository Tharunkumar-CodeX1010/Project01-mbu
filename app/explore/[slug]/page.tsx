import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/navigation/back-button";
import { Button } from "@/components/ui";
import { RegionAtlas } from "@/components/region/region-atlas";
import { PosterImage } from "@/components/media/poster-image";
import { getRegion, getVein, REGIONS } from "@/config/regions";
import { posterForRegion } from "@/lib/poster";
import { foodImageForRegion } from "@/lib/food-images";

interface RegionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return REGIONS.map((region) => ({ slug: region.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: RegionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const region = getRegion(slug);
  return { title: region ? `${region.name} — ${region.country}` : "Region" };
}

export default async function RegionPage({ params }: RegionPageProps) {
  const { slug } = await params;
  const region = getRegion(slug);

  if (!region) notFound();

  const vein = getVein(region.vein);
  const acts: Array<{ label: string; body: string }> = [
    { label: "Origin", body: region.origin },
    { label: "Transformation", body: region.transformation },
    { label: "Recognition", body: region.recognition },
  ];

  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/explore" />

      <div className="relative mb-10 aspect-[21/8] w-full overflow-hidden rounded-2xl border border-edge shadow-card">
        <PosterImage
          src={foodImageForRegion(region.slug) ?? posterForRegion(region.slug)}
          fallback={posterForRegion(region.slug)}
          alt={`Poster of ${region.name}`}
          priority
        />
        <div className="from-canvas/92 absolute inset-0 bg-gradient-to-b to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[var(--container-max)] px-6 pb-8 sm:px-6">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.25em]">
            {vein.name} · {region.country}
          </p>
          <h1 className="text-ink mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
            {region.name}
          </h1>
          <p className="text-ink-soft mt-2 max-w-xl text-sm leading-relaxed sm:text-base">
            {region.description}
          </p>
          <p className="text-accent mt-2 text-sm font-semibold">
            TAC Archetype · {vein.archetype}
          </p>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="space-y-5">
            {acts.map((act, index) => (
              <div key={act.label} className="border-edge bg-surface rounded-2xl p-6">
                <p className="text-ink-faint text-xs font-medium uppercase tracking-[0.25em]">
                  Act {String(index + 1)} · {act.label}
                </p>
                <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                  {act.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href={`/recipes?region=${region.slug}`}>
              {region.specialties.length} specialties from {region.name}
            </Button>
          </div>
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <RegionAtlas region={region} />
        </div>
      </div>
    </main>
  );
}