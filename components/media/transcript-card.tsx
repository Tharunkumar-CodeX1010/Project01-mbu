import { Badge } from "@/components/ui";
import { transcriptFor, transcriptTotalMinutes } from "@/lib/transcripts";

export function TranscriptCard({ slug }: { slug: string }) {
  const transcript = transcriptFor(slug);
  if (transcript.length === 0) return null;
  const minutes = transcriptTotalMinutes(slug);

  const format = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <details className="border-edge bg-surface shadow-card group rounded-lg">
      <summary className="flex cursor-pointer items-center justify-between gap-3 px-5 py-4 select-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center gap-2">
          <span className="text-ink text-sm font-semibold tracking-tight">
            Episode transcript
          </span>
          <Badge variant="neutral">derived · ~{minutes} min</Badge>
        </span>
        <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="border-edge border-t px-5 py-4">
        <p className="text-ink-faint mb-3 text-xs">
          Generated deterministically from this recipe&apos;s method and story —
          timings are mock-proportional, no audio source (BLOCKED_EXTERNAL_DEPENDENCY).
        </p>
        <ul className="space-y-2.5">
          {transcript.map((segment, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <span className="text-ink-faint w-12 shrink-0 text-xs tabular-nums">
                {format(segment.start)}
              </span>
              <span className="text-ink-soft leading-relaxed">
                <span className="text-accent mr-1 text-xs font-semibold uppercase">
                  {segment.speaker}
                </span>
                {segment.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}