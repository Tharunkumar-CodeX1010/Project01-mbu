"use client";

import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import { useMounted } from "@/components/ui/use-dialog";
import { LocationPickerCard } from "./location-picker-card";
import { skipLocation, useLocation } from "./location-store";
import { isLocationChosen } from "@/lib/location";

/** First-open gate: choose a place or grant device location before the food
 * adapts. Renders only after mount (SSR-safe). */
export function LocationGate() {
  const mounted = useMounted();
  const location = useLocation();

  if (!mounted) return null;
  if (isLocationChosen(location)) return null;
  if (location !== null && location.mode === "none") return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tac-location-gate-title"
      className="bg-canvas fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
    >
      <div className="border-edge bg-elevated shadow-elevated w-full max-w-xl rounded-2xl border p-6 sm:p-8">
        <p className="text-accent flex items-center gap-2 text-sm font-bold tracking-tight">
          <span aria-hidden="true" className="text-accent">
            ●
          </span>
          {siteConfig.name}
        </p>
        <h1
          id="tac-location-gate-title"
          className="text-ink mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Select your location
        </h1>
        <p className="text-ink-soft mt-2 text-sm leading-relaxed">
          Tell us where the table is, and YUMMYGO will set the menu to that
          place — or permit device location and we&apos;ll read where you are in
          the background.
        </p>
        <div className="mt-6">
          <LocationPickerCard />
        </div>
        <button
          type="button"
          onClick={skipLocation}
          className="text-ink-faint hover:text-ink mt-6 text-xs underline-offset-2 hover:underline"
        >
          Not now — keep browsing
        </button>
      </div>
    </div>,
    document.body
  );
}