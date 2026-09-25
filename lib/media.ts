/**
 * Media pipeline contract.
 *
 * Statuses are respected literally:
 *  - "blocked-external": needs an authorized source (YouTube key, licensed
 *    footage, encoded MP4). Nothing is fabricated here.
 *  - "procedural": generated in-repo (SVG posters, no photo rights needed).
 *
 * The daily-refresh path (S29) and upload/training gates (S28/S29) treat this
 * module as the single point where real media may later attach.
 */

export interface EpisodeMedia {
  recipeSlug: string;
  videoStatus: "blocked-external";
  posterStatus: "procedural";
  videoSrc: string | null;
  posterSrc: string;
  durationSeconds: number;
  caption: string;
}

const DEFAULT_POSTER = "/media/poster-history.svg";
const COOK_LOOP_MINUTES = 6;

export function mediaFor(recipeSlug: string, cookMinutes = 30): EpisodeMedia {
  return {
    recipeSlug,
    videoStatus: "blocked-external",
    posterStatus: "procedural",
    videoSrc: null,
    posterSrc: DEFAULT_POSTER,
    durationSeconds: Math.max(60, cookMinutes) * 60 + COOK_LOOP_MINUTES * 60,
    caption:
      "Procedural poster (SVG, generated in-repo). Video source is BLOCKED_EXTERNAL_DEPENDENCY until authorized media is configured.",
  };
}

export function mediaStatusLabel(status: EpisodeMedia["videoStatus"]): string {
  return status === "blocked-external"
    ? "Video blocked — external source required"
    : status;
}