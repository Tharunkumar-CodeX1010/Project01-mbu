import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/navigation/back-button";
import { Button } from "@/components/ui";
import { PageIntro } from "@/components/shared/page-intro";
import { Reveal } from "@/components/motion/reveal";
import { RegionAtlas } from "@/components/region/region-atlas";
import { getRegion, getVein, REGIONS } from "@/config/regions";

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
      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <PageIntro
            overline={`${vein.name} · ${region.country}`}
            title={region.name}
            description={region.description}
          />
          <p className="text-accent mt-2 text-sm font-semibold">
            TAC Archetype · {vein.archetype}
          </p>
          <div className="mt-8 space-y-6">
            {acts.map((act, index) => (
              <Reveal key={act.label} delay={index * 0.05}>
                <div className="border-edge bg-surface rounded-lg p-5">
                  <p className="text-ink-faint text-xs font-medium uppercase tracking-[0.25em]">
                    Act {String(index + 1)} · {act.label}
                  </p>
                  <p className="text-ink-soft mt-2 text-sm leading-relaxed">
                    {act.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Reveal>
              <Button href={`/recipes?region=${region.slug}`}>
                {region.specialties.length} specialties from {region.name}
              </Button>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
          <RegionAtlas region={region} />
        </Reveal>
      </div>
    </main>
  );
}