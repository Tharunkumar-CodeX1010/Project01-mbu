import Link from "next/link";
import { Badge } from "@/components/ui";
import { MotionCard } from "@/components/motion/motion-card";
import { getRegion } from "@/config/regions";
import type { HistoryFilm } from "@/lib/history";

export function HistoryFilmCard({ film }: { film: HistoryFilm }) {
  return (
    <MotionCard className="h-full">
      <Link
        href={`/history/${film.slug}`}
        className="border-edge bg-surface shadow-glass group block h-full overflow-hidden rounded-lg transition-colors hover:bg-surface-strong"
      >
        <div className="relative">
          <div
            role="img"
            aria-label={`Film poster for ${film.title}`}
            className="h-36 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${film.poster})` }}
          />
          <div className="from-canvas absolute inset-0 bg-gradient-to-t to-transparent" />
          <span className="text-accent absolute right-3 top-3 text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
            {film.episodeMinutes} min
          </span>
          <div className="absolute bottom-3 left-4">
            <p className="text-ink-faint text-[0.65rem] font-medium uppercase tracking-[0.25em]">
              {film.span}
            </p>
            <h3 className="text-ink text-lg font-semibold tracking-tight">
              {film.title}
            </h3>
          </div>
        </div>
        <div className="border-edge border-t p-4">
          <p className="text-ink-soft text-sm leading-relaxed">{film.artefact}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {film.regions.map((slug) => {
              const region = getRegion(slug);
              return <Badge key={slug} variant="outline">{region?.name ?? slug}</Badge>;
            })}
            <Badge variant="neutral">Video mocked</Badge>
          </div>
        </div>
      </Link>
    </MotionCard>
  );
}