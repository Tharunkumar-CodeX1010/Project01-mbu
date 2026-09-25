import Link from "next/link";
import { Badge } from "@/components/ui";
import { getRegion } from "@/config/regions";
import type { HistoryFilm } from "@/lib/history";
import { posterForRegion } from "@/lib/poster";
import { foodImageForFilm } from "@/lib/food-images";
import { PosterImage } from "@/components/media/poster-image";

export function HistoryFilmCard({ film }: { film: HistoryFilm }) {
  const primaryRegion = film.regions[0];

  return (
    <Link
      href={`/history/${film.slug}`}
      className="border-edge bg-surface shadow-card group block h-full overflow-hidden rounded-xl transition-shadow hover:shadow-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <PosterImage
          src={foodImageForFilm(film.slug) ?? posterForRegion(primaryRegion)}
          fallback={posterForRegion(primaryRegion)}
          alt={`Film poster for ${film.title}`}
        />
        <span className="text-accent-ink bg-accent/90 absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold">
          {film.episodeMinutes} min
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-canvas/85 to-transparent p-4 pt-10">
          <p className="text-ink-faint text-[0.65rem] font-medium uppercase tracking-[0.25em]">
            Archival film · {film.span}
          </p>
          <h3 className="text-ink text-lg font-semibold tracking-tight">
            {film.title}
          </h3>
        </div>
      </div>
      <div className="border-edge border-t p-4">
        <p className="text-ink-soft text-sm leading-relaxed">{film.artefact}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {film.regions.slice(0, 2).map((slug) => {
            const region = getRegion(slug);
            return <Badge key={slug} variant="outline">{region?.name ?? slug}</Badge>;
          })}
          <Badge variant="neutral">Video mocked</Badge>
        </div>
      </div>
    </Link>
  );
}