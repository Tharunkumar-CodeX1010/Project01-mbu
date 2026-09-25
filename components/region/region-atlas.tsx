import { Badge } from "@/components/ui";
import { getVein } from "@/config/regions";
import type { Region } from "@/config/regions";

/** Framed procedural atlas card for a single region's detail page. */
export function RegionAtlas({ region }: { region: Region }) {
  const vein = getVein(region.vein);

  return (
    <div className="border-edge bg-surface shadow-card overflow-hidden rounded-lg">
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={`Procedural atlas of ${region.name}`}
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="at-rim" cx="0.5" cy="0.5" r="0.8">
            <stop offset="0" stopColor="var(--color-elevated)" />
            <stop offset="1" stopColor="var(--color-surface-solid)" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#at-rim)" />
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`x${i}`}
            x1={10}
            y1={(i + 1) * 9 + 1}
            x2={90}
            y2={(i + 1) * 9 + 1}
            stroke="var(--color-edge)"
            strokeWidth="0.06"
          />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={`y${i}`}
            x1={(i + 1) * 8.5 + 2}
            y1={10}
            x2={(i + 1) * 8.5 + 2}
            y2={90}
            stroke="var(--color-edge)"
            strokeWidth="0.06"
          />
        ))}
        <circle
          cx={region.atoll.x}
          cy={region.atoll.y + 10}
          r={3}
          fill="var(--color-accent)"
        >
          <title>Atoll of {region.name}</title>
        </circle>
        <circle
          cx={region.atoll.x}
          cy={region.atoll.y + 10}
          r={6}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="0.2"
          className="animate-tac-breath"
        />
        <text
          x={region.atoll.x}
          y={region.atoll.y + 1}
          textAnchor="middle"
          fill="var(--color-ink-faint)"
          fontSize="3.2"
        >
          {region.name}
        </text>
      </svg>

      <div className="border-edge border-t p-5">
        <p className="text-ink-faint text-xs font-medium uppercase tracking-[0.2em]">
          {vein.name}
        </p>
        <p className="text-accent mt-1 text-sm font-semibold">
          TAC Archetype · {vein.archetype}
        </p>
        <div className="mt-4">
          <p className="text-ink-faint text-xs uppercase tracking-[0.2em]">
            Trinity pantry
          </p>
          <ul className="mt-2 space-y-1.5">
            {region.trinity.map((item) => (
              <li key={item} className="text-ink-soft flex items-center gap-2 text-sm">
                <span className="text-accent" aria-hidden="true">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {region.specialties.map((specialty) => (
            <Badge key={specialty} variant="outline">
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}