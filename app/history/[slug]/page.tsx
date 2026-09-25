import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge, Button } from "@/components/ui";
import { Reveal } from "@/components/motion/reveal";
import { BackButton } from "@/components/navigation/back-button";
import { getFilm, HISTORY_FILMS } from "@/lib/history";
import { getRegion } from "@/config/regions";
import { getRecipe } from "@/config/recipes";

interface HistoryFilmPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: HistoryFilmPageProps): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilm(slug);
  return { title: film ? film.title : "Food History" };
}

export function generateStaticParams() {
  return HISTORY_FILMS.map((film) => ({ slug: film.slug }));
}

export const dynamicParams = false;

export default async function HistoryFilmPage({ params }: HistoryFilmPageProps) {
  const { slug } = await params;
  const film = getFilm(slug);
  if (!film) notFound();

  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/history" />

      <div className="relative isolate overflow-hidden rounded-lg">
        <div
          role="img"
          aria-label={`Poster of ${film.title}`}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${film.poster})` }}
        />
        <div className="from-canvas absolute inset-0 bg-gradient-to-t to-canvas/20" />
        <div className="relative z-10 max-w-2xl px-6 py-16 sm:px-10">
          <p className="text-accent text-xs font-medium uppercase tracking-[0.3em]">
            Archival film · {film.span}
          </p>
          <h1 className="text-ink mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
            {film.title}
          </h1>
          <p className="text-ink-soft mt-3 text-base leading-relaxed">
            {film.artefact}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge variant="orange">{film.episodeMinutes} min episode</Badge>
            <Badge variant="outline">Video mocked</Badge>
            <Badge variant="neutral">
              {film.scenes.length} scenes
            </Badge>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <section aria-label="Scenes">
            <Reveal>
              <h2 className="text-ink text-xl font-semibold tracking-tight">
                Scenes
              </h2>
            </Reveal>
            <ol className="mt-4 space-y-3">
              {film.scenes.map((scene) => (
                <Reveal key={scene.scene} delay={scene.scene * 0.04}>
                  <li className="border-edge bg-surface rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">
                        Scene {scene.scene}
                      </p>
                      <p className="text-ink-faint text-xs">{scene.minutes} min</p>
                    </div>
                    <h3 className="text-ink mt-1 text-base font-semibold">
                      {scene.title}
                    </h3>
                    <p className="text-ink-soft mt-1 text-sm leading-relaxed">
                      {scene.synopsis}
                    </p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>

          <section aria-label="Timeline" className="mt-10">
            <Reveal>
              <h2 className="text-ink text-xl font-semibold tracking-tight">
                Historical thread
              </h2>
            </Reveal>
            <ol className="mt-4 space-y-0">
              {film.timeline.map((point, index) => (
                <li key={point.year} className="relative flex gap-4 pb-5 pl-6 last:pb-0">
                  {index < film.timeline.length - 1 ? (
                    <span aria-hidden="true" className="border-edge absolute left-[7px] top-3 h-full border-l" />
                  ) : null}
                  <span aria-hidden="true" className="bg-accent absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full" />
                  <div>
                    <p className="text-accent text-xs font-semibold uppercase tracking-[0.2em]">
                      {point.year}
                    </p>
                    <p className="text-ink-soft mt-1 text-sm leading-relaxed">
                      {point.event}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-label="Provenance" className="mt-10">
            <Reveal>
              <h2 className="text-ink text-xl font-semibold tracking-tight">
                Provenance
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-ink-soft mt-3 border-l-2 border-green bg-elevated/60 rounded-r-lg p-4 text-sm leading-relaxed">
                {film.provenance}
              </p>
            </Reveal>
          </section>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
          <aside aria-label="Connection map" className="border-edge bg-surface shadow-card rounded-lg p-5 space-y-5">
            <div>
              <h2 className="text-ink text-sm font-semibold tracking-tight">
                Feature regions
              </h2>
              <ul className="mt-2 space-y-1.5">
                {film.regions.map((regionSlug) => {
                  const region = getRegion(regionSlug);
                  return (
                    <li key={regionSlug}>
                      <Button href={`/explore/${regionSlug}`} variant="ghost" size="sm" className="h-auto px-2 py-1.5 text-sm">
                        {region?.name ?? regionSlug}
                        {region ? <span className="text-ink-faint"> · {region.country}</span> : null}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <h2 className="text-ink text-sm font-semibold tracking-tight">
                Dishes in this episode
              </h2>
              <ul className="mt-2 space-y-1.5">
                {film.dishes.map((dishSlug) => {
                  const recipe = getRecipe(dishSlug);
                  return (
                    <li key={dishSlug}>
                      <a
                        href={`/recipes/${dishSlug}`}
                        className="text-ink-soft hover:text-accent text-sm hover:underline"
                      >
                        {recipe?.name ?? dishSlug}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>
    </main>
  );
}