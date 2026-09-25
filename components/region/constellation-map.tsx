import { REGIONS } from "@/config/regions";

interface ConstellationMapProps {
  highlight?: string;
}

/**
 * Procedural "constellation atlas" — abstract geography, not a cartographic
 * claim. Each point is a region whose proximity hints at shared veins.
 */
export function ConstellationMap({ highlight }: ConstellationMapProps) {
  return (
    <div className="border-edge bg-surface shadow-glass overflow-hidden rounded-lg">
      <svg
        viewBox="0 0 100 60"
        role="img"
        aria-label="Procedural map of TAC regions"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="cn-bg" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0" stopColor="var(--color-elevated)" />
            <stop offset="1" stopColor="var(--color-surface)" />
          </radialGradient>
        </defs>

        <rect width="100" height="60" fill="url(#cn-bg)" />

        {Array.from({ length: 13 }, (_, i) => (
          <line
            key={`hl-${i}`}
            x1={7.5}
            y1={i * 3.6 + 3}
            x2={92.5}
            y2={i * 3.6 + 3}
            stroke="var(--color-edge)"
            strokeWidth="0.05"
          />
        ))}
        {Array.from({ length: 17 }, (_, i) => (
          <line
            key={`vl-${i}`}
            x1={i * 5.3 + 5}
            y1={2}
            x2={i * 5.3 + 5}
            y2={58}
            stroke="var(--color-edge)"
            strokeWidth="0.05"
          />
        ))}

        {REGIONS.map((region) => {
          const active = region.slug === highlight;
          return (
            <g key={region.slug}>
              <circle
                cx={region.atoll.x}
                cy={region.atoll.y}
                r={active ? 2.4 : 1.6}
                fill="var(--color-accent)"
                opacity={active ? 1 : 0.85}
              >
                <title>{`${region.name} — ${region.country}`}</title>
              </circle>
              {active ? (
                <circle
                  cx={region.atoll.x}
                  cy={region.atoll.y}
                  r={4}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="0.15"
                  className="animate-tac-breath"
                />
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
}