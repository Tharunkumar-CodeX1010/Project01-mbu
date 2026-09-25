import { heroFallback } from "@/config/hero";
import { CinematicHero } from "@/components/hero/cinematic-hero";
import { Reveal } from "@/components/motion/reveal";

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
      <section className="border-t border-edge bg-elevated/40">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-6 sm:px-6">
          {journey.map((step, index) => (
            <Reveal key={step} delay={index * 0.06} className="flex items-center gap-2">
              <span className="text-accent text-xs font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-ink-soft text-sm">{step}</span>
              {index < journey.length - 1 ? (
                <span aria-hidden="true" className="text-ink-faint ml-2">
                  →
                </span>
              ) : null}
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}