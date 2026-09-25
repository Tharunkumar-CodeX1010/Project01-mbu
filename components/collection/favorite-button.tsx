"use client";

import { useSyncExternalStore } from "react";
import {
  readCollection,
  writeCollection,
  isSaved,
  addFavorite,
  removeFavorite,
} from "@/lib/collections";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

let cached: ReturnType<typeof readCollection> | null = null;

function getSnapshot() {
  if (!cached) cached = readCollection();
  return cached;
}

function getServerSnapshot() {
  return readCollection();
}

export function FavoriteButton({ slug }: { slug: string }) {
  const collection = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const saved = isSaved(collection, slug);

  const toggle = () => {
    const current = readCollection();
    cached = saved ? removeFavorite(current, slug) : addFavorite(current, slug);
    writeCollection(cached);
  };

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={toggle}
      className={
        saved
          ? "bg-accent text-accent-ink shadow-glow-orange w-full rounded-lg px-4 py-2.5 text-sm font-medium"
          : "border-edge text-ink-soft hover:text-ink w-full rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
      }
    >
      {saved ? "Saved to your dishes" : "Save to your dishes"}
      <span aria-hidden="true" className="ml-1">
        {saved ? "♥" : "♡"}
      </span>
    </button>
  );
}