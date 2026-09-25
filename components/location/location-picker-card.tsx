"use client";

import { useState } from "react";
import { REGIONS, getVein } from "@/config/regions";
import {
  resolveDeviceLocation,
  setManualLocation,
  useLocation,
} from "./location-store";
import { isLocationChosen, locationShortLabel } from "@/lib/location";
import { Badge } from "@/components/ui";
import { Button } from "@/components/ui";

/** Shared panel: "use my device location" + pick a city from the atlas. */
export function LocationPickerCard() {
  const location = useLocation();
  const [state, setState] = useState<"idle" | "locating" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const chosen = isLocationChosen(location);

  const onDevice = async () => {
    setState("locating");
    setError(null);
    const result = await resolveDeviceLocation();
    if (!result.ok) {
      setState("error");
      setError(result.error ?? "Could not read your location.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <OnDeviceRow
          busy={state === "locating"}
          onClick={onDevice}
        />
        {error ? (
          <p role="alert" className="text-accent mt-2 text-xs">
            {error} You can still choose a city below.
          </p>
        ) : null}
        {chosen ? (
          <p className="text-accent mt-2 text-sm font-medium">
            Local food is now tuned to {locationShortLabel(location)}.
          </p>
        ) : null}
      </div>

      <div>
        <p className="text-ink-soft text-xs font-medium uppercase tracking-[0.2em]">
          Or choose where the table is set
        </p>
        <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
          {REGIONS.map((region) => {
            const vein = getVein(region.vein);
            return (
              <li key={region.slug}>
                <button
                  type="button"
                  onClick={() => setManualLocation(region.slug)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    chosen && location.regionSlug === region.slug
                      ? "border-accent bg-accent/10"
                      : "border-edge hover:border-edge-strong hover:bg-surface"
                  }`}
                >
                  <span>
                    <span className="text-ink block text-sm font-medium">
                      {region.name}
                    </span>
                    <span className="text-ink-faint block text-xs">
                      {region.country} · {vein.name}
                    </span>
                  </span>
                  <span className="text-ink-faint text-xs">→</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-ink-faint text-xs">
          Location lives only in your browser. Change it anytime from the header.
        </p>
        {chosen ? (
          <Badge variant="green">Set · {locationShortLabel(location)}</Badge>
        ) : null}
      </div>
    </div>
  );
}

function OnDeviceRow({
  busy,
  onClick,
}: {
  busy: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-edge bg-elevated/60 rounded-xl border p-4">
      <p className="text-ink text-sm font-semibold">Use my device location</p>
      <p className="text-ink-soft mt-1 text-xs leading-relaxed">
        The website will ask for permission, read your device location in the
        background, and match it to the nearest region in the atlas.
      </p>
      <Button
        type="button"
        variant="primary"
        onClick={onClick}
        disabled={busy}
        className="mt-3"
      >
        {busy ? "Reading your device…" : "Allow & use my location"}
      </Button>
    </div>
  );
}