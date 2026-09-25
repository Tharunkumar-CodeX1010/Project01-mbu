"use client";

import { useState } from "react";
import { Modal } from "@/components/ui";
import { LocationPickerCard } from "./location-picker-card";
import {
  clearLocation,
  useLocation,
} from "./location-store";
import { isLocationChosen, locationShortLabel } from "@/lib/location";

/** Header chip: shows the active place and opens the change-location dialog. */
export function LocationChip() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const chosen = isLocationChosen(location);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={chosen ? `Change location from ${locationShortLabel(location)}` : "Set your location"}
        className="border-edge text-ink-soft hover:text-ink flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${chosen ? "bg-accent" : "bg-ink-faint"}`}
        />
        {chosen ? locationShortLabel(location) : "Set location"}
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={chosen ? `Local food for ${locationShortLabel(location)}` : "Select your location"}
        description="Food items adapt to the place you choose."
      >
        <LocationPickerCard />
        {chosen ? (
          <button
            type="button"
            onClick={() => {
              clearLocation();
              setOpen(false);
            }}
            className="text-ink-faint hover:text-accent mt-2 text-xs underline-offset-2 hover:underline"
          >
            Remove location and start over
          </button>
        ) : null}
      </Modal>
    </>
  );
}