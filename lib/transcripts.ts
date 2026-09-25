import { getRecipe } from "@/config/recipes";

export interface TranscriptSegment {
  start: number;
  end: number;
  speaker: "chef" | "narrator";
  text: string;
}

const SEGMENT_SECONDS = 25;
const MINUTE_FACTOR = 90;

/** Derive a deterministic episode transcript from a recipe's real steps and
 *  story acts. Timings are mock-proportional; no audio source exists yet. */
export function transcriptFor(slug: string): TranscriptSegment[] {
  const recipe = getRecipe(slug);
  if (!recipe) return [];

  const segments: TranscriptSegment[] = [];
  let cursor = 0;

  const push = (speaker: TranscriptSegment["speaker"], text: string) => {
    segments.push({ start: cursor, end: cursor + SEGMENT_SECONDS, speaker, text });
    cursor += SEGMENT_SECONDS;
  };

  push("narrator", recipe.story[0]?.body ?? recipe.blurb);
  for (const step of recipe.steps) {
    push("chef", step);
  }
  if (recipe.tips.length > 0) {
    push("narrator", `Chef's note: ${recipe.tips[0]}`);
  }

  const scale = Math.max(1, Math.round(recipe.timeMin * MINUTE_FACTOR / Math.max(cursor, 1)));
  return segments.map((segment) => ({
    ...segment,
    start: Math.round(segment.start * scale),
    end: Math.round(segment.end * scale),
  }));
}

export function transcriptTotalMinutes(slug: string): number {
  const transcript = transcriptFor(slug);
  if (transcript.length === 0) return 0;
  return Math.round(transcript[transcript.length - 1].end / 60);
}