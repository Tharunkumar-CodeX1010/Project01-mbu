"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  readCollection,
  writeCollection,
  updateFavoriteNote,
  removeFavorite,
  upsertFork,
  updateForkNote,
  removeFork,
} from "@/lib/collections";
import { getRecipe } from "@/config/recipes";
import type { CollectionState } from "@/lib/collections";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

let cached: CollectionState | null = null;

function getSnapshot(): CollectionState {
  if (!cached) cached = readCollection();
  return cached;
}

function getServerSnapshot(): CollectionState {
  return readCollection();
}

function commit(next: CollectionState) {
  cached = next;
  writeCollection(next);
}

export function CollectionsPanel() {
  const collection = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section aria-label="Saved dishes" className="border-edge bg-surface shadow-glass rounded-lg p-6">
        <h2 className="text-ink text-lg font-semibold tracking-tight">
          Saved dishes
        </h2>
        <p className="text-ink-soft mt-1 text-sm">
          {collection.favorites.length} saved
        </p>
        {collection.favorites.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {collection.favorites.map((item) => {
              const recipe = getRecipe(item.slug);
              return (
                <li key={item.slug} className="border-edge rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      href={`/recipes/${item.slug}`}
                      className="text-ink hover:text-accent truncate text-sm font-medium hover:underline"
                    >
                      {recipe?.name ?? item.slug}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Remove ${recipe?.name ?? item.slug}`}
                      onClick={() =>
                        commit(
                          removeFavorite(
                            readCollection(),
                            item.slug
                          )
                        )
                      }
                      className="text-ink-faint hover:text-ink text-xs"
                    >
                      remove
                    </button>
                  </div>
                  <label htmlFor={`fav-note-${item.slug}`} className="sr-only">
                    Note for {recipe?.name ?? item.slug}
                  </label>
                  <input
                    id={`fav-note-${item.slug}`}
                    type="text"
                    value={item.note}
                    placeholder="A note for this dish…"
                    onChange={(e) =>
                      commit(
                        updateFavoriteNote(
                          readCollection(),
                          item.slug,
                          e.target.value
                        )
                      )
                    }
                    className="border-edge bg-elevated focus:border-accent text-ink placeholder:text-ink-faint mt-2 w-full rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-ink-faint mt-4 text-sm">
            Nothing saved yet — use the heart on any masterclass page.
          </p>
        )}
      </section>

      <section aria-label="Forked adaptations" className="border-edge bg-surface shadow-glass rounded-lg p-6">
        <h2 className="text-ink text-lg font-semibold tracking-tight">
          Your forked adaptations
        </h2>
        <p className="text-ink-soft mt-1 text-sm">
          Personalized versions of base dishes, kept here with your notes.
        </p>
        {collection.forks.length > 0 ? (
          <ul className="mt-4 space-y-3">
            {collection.forks.map((fork) => {
              const recipe = getRecipe(fork.forkOf);
              return (
                <li key={fork.slug} className="border-edge rounded-lg border p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-ink truncate text-sm font-medium">
                        {recipe?.name ?? fork.forkOf}
                      </p>
                      <p className="text-ink-faint mt-0.5 text-xs">
                        fork {fork.slug}
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Delete fork of ${recipe?.name ?? fork.forkOf}`}
                      onClick={() => commit(removeFork(readCollection(), fork.slug))}
                      className="text-ink-faint hover:text-ink text-xs"
                    >
                      delete
                    </button>
                  </div>
                  <label htmlFor={`fork-note-${fork.slug}`} className="sr-only">
                    Adaptation note
                  </label>
                  <textarea
                    id={`fork-note-${fork.slug}`}
                    rows={2}
                    value={fork.note}
                    placeholder="What did you change? quantities, heat, substitutions…"
                    onChange={(e) =>
                      commit(
                        updateForkNote(
                          readCollection(),
                          fork.slug,
                          e.target.value
                        )
                      )
                    }
                    className="border-edge bg-elevated focus:border-accent text-ink placeholder:text-ink-faint mt-2 w-full resize-none rounded-lg border px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-ink-faint mt-4 text-sm">
            No forks yet. A fork copies a dish here so you can personalize it
            without touching the masterclass.
          </p>
        )}
        <button
          type="button"
          onClick={() => {
            const current = readCollection();
            const base = getRecipe("pizza-napoletana");
            if (!base) return;
            const result = upsertFork(current, "pizza-napoletana");
            commit(result.state);
          }}
          className="border-edge text-ink-soft hover:text-ink mt-4 rounded-lg border px-3 py-2 text-xs"
        >
          + Fork a base dish (example: Margherita)
        </button>
      </section>
    </div>
  );
}