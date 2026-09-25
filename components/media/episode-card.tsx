import { Badge } from "@/components/ui";
import { mediaFor, mediaStatusLabel } from "@/lib/media";

export function EpisodeCard({ recipeSlug, cookMinutes }: { recipeSlug: string; cookMinutes: number }) {
  const media = mediaFor(recipeSlug, cookMinutes);

  return (
    <aside aria-label="Episode & imagery" className="border-edge bg-surface shadow-card overflow-hidden rounded-lg">
      <div className="relative">
        <div
          role="img"
          aria-label="Procedural episode poster"
          className="h-40 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${media.posterSrc})` }}
        />
        <span className="bg-accent text-accent-ink absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold">
          MOCK
        </span>
      </div>
      <div className="p-5">
        <h2 className="text-ink text-lg font-semibold tracking-tight">
          Episode & imagery
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="orange">{mediaStatusLabel(media.videoStatus)}</Badge>
          <Badge variant="neutral">poster: procedural SVG</Badge>
        </div>
        <p className="text-ink-faint mt-3 text-xs leading-relaxed">
          {media.caption}
        </p>
        <p className="text-ink-faint mt-2 text-xs">
          Episode length estimate: {Math.round(media.durationSeconds / 60)} min
          (mock).
        </p>
      </div>
    </aside>
  );
}