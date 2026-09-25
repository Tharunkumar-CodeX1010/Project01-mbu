"use client";

import { useSyncExternalStore } from "react";
import { Badge } from "@/components/ui";
import { RECIPES } from "@/config/recipes";
import {
  buildShoppingItems,
  deserialize,
  serialize,
  shoppingStorageKey,
} from "@/lib/shopping";
import type { ShoppingItem } from "@/lib/shopping";

const KEY = shoppingStorageKey();

let cached: ShoppingItem[] | null = null;

function readItems(): ShoppingItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? deserialize(raw) : [];
  } catch {
    return [];
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot(): ShoppingItem[] {
  if (!cached) cached = readItems();
  return cached;
}

function getServerSnapshot(): ShoppingItem[] {
  return [];
}

function persist(items: ShoppingItem[]) {
  cached = items;
  try {
    window.localStorage.setItem(KEY, serialize(items));
  } catch {
    // memory-only until refresh
  }
}

export function ShoppingListPanel() {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addRecipe = (slug: string) => {
    persist([...readItems(), ...buildShoppingItems([slug])]);
  };

  const toggle = (id: string) => {
    persist(
      items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const remove = (id: string) => {
    persist(items.filter((item) => item.id !== id));
  };

  const clearChecked = () => {
    persist(items.filter((item) => !item.checked));
  };

  const clearAll = () => persist([]);

  const unchecked = items.filter((item) => !item.checked);
  const done = items.length - unchecked.length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-ink-soft text-sm">
            {unchecked.length} to buy · {done} in the basket
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => clearChecked()}
            className="border-edge text-ink-soft hover:text-ink rounded-lg border px-3 py-1.5 text-xs"
          >
            Clear checked
          </button>
          <button
            type="button"
            onClick={() => clearAll()}
            className="border-edge text-ink-soft hover:text-ink rounded-lg border px-3 py-1.5 text-xs"
          >
            Clear all
          </button>
        </div>
      </div>

      {items.length > 0 ? (
        <ul className="border-edge bg-surface shadow-glass mt-4 divide-y divide-edge rounded-lg">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 px-4 py-3">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggle(item.id)}
                aria-label={`Mark ${item.ingredient} bought`}
                className="accent-accent h-4 w-4"
              />
              <div className="min-w-0 flex-1">
                <p className={item.checked ? "text-ink-faint line-through" : "text-ink text-sm"}>
                  {item.ingredient}
                </p>
                <p className="text-ink-faint text-xs">{item.recipe}</p>
              </div>
              <Badge variant="neutral">{item.qty}</Badge>
              <button
                type="button"
                aria-label={`Remove ${item.ingredient}`}
                onClick={() => remove(item.id)}
                className="text-ink-faint hover:text-ink"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="border-edge bg-surface shadow-glass mt-4 rounded-lg p-6 text-center">
          <p className="text-ink-soft text-sm">
            The list is empty. Add a masterclass from its recipe page.
          </p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-ink text-lg font-semibold tracking-tight">
          Add from a masterclass
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {RECIPES.map((recipe) => (
            <label
              key={recipe.slug}
              className="border-edge text-ink-soft hover:text-ink flex cursor-pointer items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm transition-colors"
            >
              <span className="truncate">{recipe.name}</span>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) addRecipe(recipe.slug);
                }}
                className="accent-accent h-4 w-4"
                aria-label={`Add ingredients of ${recipe.name}`}
              />
            </label>
          ))}
        </div>
      </div>

      <p className="text-ink-faint mt-6 text-xs">
        Saved locally in this browser. Provider pricing and split-cart arrive
        with the Marketplace (S20).
      </p>
    </div>
  );
}