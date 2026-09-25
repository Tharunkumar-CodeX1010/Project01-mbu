import { heroFallback } from "@/config/hero";
import { CinematicHero } from "@/components/hero/cinematic-hero";
import { LocalBand } from "@/components/location/local-band";
import { VEINS } from "@/config/regions";
import { posterForVein } from "@/lib/poster";
import { PosterImage } from "@/components/media/poster-image";

const journey = [
  "Discover",
  "Explore",
  "Understand",
  "Learn",
  "Adapt",
  "Cook",
  "Shop",
  "Optimize",
] as const;

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <CinematicHero item={heroFallback} />

      <LocalBand />

      <section className="border-t border-edge bg-elevated/50">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-6 sm:px-6">
          {journey.map((step, index) => (
            <span key={step} className="flex items-center gap-2">
              <span className="text-accent text-xs font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-ink-soft text-sm">{step}</span>
              {index < journey.length - 1 ? (
                <span aria-hidden="true" className="text-ink-faint ml-2">
                  →
                </span>
              ) : null}
            </span>
          ))}
        </div>
      </section>

      <section aria-label="The eight culinary veins" className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-12 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.3em]">
            Planet Earth, plated
          </p>
          <h2 className="text-ink mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Eight culinary veins
          </h2>
          <p className="text-ink-soft mt-3 text-base leading-relaxed">
            A big-frame tour of the traditions behind every dish — enter a vein
            to meet its regions, then a region to read its story.
          </p>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VEINS.map((vein) => (
            <a
              key={vein.slug}
              href={`/explore#${vein.slug}`}
              className="group relative block overflow-hidden rounded-xl border border-edge bg-surface shadow-card transition-shadow hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <PosterImage
                  src={posterForVein(vein.slug)}
                  alt={`Culinary poster of the ${vein.name}`}
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas/90 to-transparent p-4 pt-10">
                <p className="text-accent text-[0.65rem] font-medium uppercase tracking-[0.25em]">
                  {vein.archetype}
                </p>
                <p className="text-ink mt-0.5 text-lg font-semibold leading-tight">
                  {vein.name}
                </p>
                <p className="text-ink-soft mt-1 line-clamp-1 text-sm">
                  {vein.oneLiner}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="text-accent absolute right-4 top-3 text-lg transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}