import type { HeroContentItem } from "@/config/hero";
import { Button } from "@/components/ui";
import { siteConfig } from "@/config/site";
import { PosterImage } from "@/components/media/poster-image";

export function CinematicHero({ item }: { item: HeroContentItem }) {
  return (
    <section
      aria-label={`Featured dish: ${item.title}`}
      className="relative isolate flex min-h-[70vh] items-end overflow-hidden"
    >
      <div className="absolute inset-0">
        <PosterImage
          src={item.poster}
          alt={`Freshly-told poster of ${item.title}`}
          priority
        />
      </div>
      <div
        aria-hidden="true"
        className="from-canvas via-canvas/55 to-transparent absolute inset-0 bg-gradient-to-t"
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-4 pb-14 sm:px-6 sm:pb-20">
        <p className="text-accent text-xs font-medium uppercase tracking-[0.3em] sm:text-sm">
          {item.overline}
        </p>
        <h1 className="text-ink mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {item.title}
        </h1>
        <p className="text-ink-soft mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
          {item.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={item.recipeHref}>{item.recipeLabel}</Button>
          <Button href={item.exploreHref} variant="glass">
            {item.exploreLabel}
          </Button>
        </div>
        <p className="text-ink-faint mt-8 text-xs">
          {siteConfig.project} · {siteConfig.title}
        </p>
      </div>
    </section>
  );
}