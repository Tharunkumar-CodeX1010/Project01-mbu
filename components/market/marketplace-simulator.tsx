"use client";

import { useSyncExternalStore, useMemo } from "react";
import { Badge } from "@/components/ui";
import { MOCKED_PROVIDERS, MARKETPLACE_STATUS, splitCart } from "@/lib/marketplace";
import { deserialize, shoppingStorageKey } from "@/lib/shopping";

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getSnapshot() {
  return window.localStorage.getItem(shoppingStorageKey()) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

const SAMPLE_LINES = [
  { item: "Basmati rice", qty: 2 },
  { item: "Saffron", qty: 1 },
  { item: "Kombu", qty: 3 },
  { item: "Long-grain rice", qty: 1 },
  { item: "Palm oil", qty: 2 },
];

export function MarketplaceSimulator() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const list = useMemo(() => deserialize(raw), [raw]);

  const lines = useMemo(() => {
    const merged = new Map<string, number>();
    for (const entry of list.length > 0 ? list : SAMPLE_LINES) {
      const item = "item" in entry ? entry.item : entry.ingredient;
      const qty = typeof entry.qty === "number" ? entry.qty : parseFloat(entry.qty) || 1;
      merged.set(item, (merged.get(item) ?? 0) + qty);
    }
    return Array.from(merged.entries()).map(([item, qty]) => ({ item, qty }));
  }, [list]);

  const cart = useMemo(() => splitCart(lines), [lines]);

  return (
    <div>
      <div className="border-edge bg-surface shadow-glass rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-ink text-lg font-semibold">Split-cart demo</h2>
          <Badge variant="orange">MOCKED</Badge>
        </div>
        <p className="text-ink-faint mt-1 text-xs">{MARKETPLACE_STATUS}</p>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <div className="border-edge bg-surface shadow-glass rounded-lg p-5">
          <h3 className="text-ink text-sm font-semibold uppercase tracking-[0.2em]">
            Providers
          </h3>
          <ul className="mt-3 space-y-2">
            {MOCKED_PROVIDERS.map((provider) => (
              <li key={provider.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-ink-soft">{provider.name}</span>
                <span className="flex items-center gap-2">
                  <Badge variant="neutral">{provider.kind}</Badge>
                  <span className="text-ink-faint text-xs">{provider.speedLabel}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-edge bg-surface shadow-glass rounded-lg p-5">
          <h3 className="text-ink text-sm font-semibold uppercase tracking-[0.2em]">
            Allocation
          </h3>
          <ul className="mt-3 space-y-2">
            {cart.allocations.map((alloc) => (
              <li key={alloc.item} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-ink-soft">
                  {alloc.item}
                  <span className="text-ink-faint text-xs"> ×{alloc.qty}</span>
                </span>
                <span className="text-accent">
                  {alloc.providerName}
                  <span className="text-accent ml-2 font-medium">{alloc.lineCost.toFixed(2)}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="border-edge mt-3 space-y-1 border-t pt-3 text-sm">
            <p className="text-ink-soft flex justify-between">
              <span>Subtotal</span>
              <span>{cart.subtotal.toFixed(2)}</span>
            </p>
            <p className="text-ink-soft flex justify-between">
              <span>Delivery fees</span>
              <span>{cart.fees.toFixed(2)}</span>
            </p>
            <p className="text-accent flex justify-between font-semibold">
              <span>Before checkout</span>
              <span>{cart.totalBeforeCheckout.toFixed(2)}</span>
            </p>
          </div>
        </div>
      </div>

      {list.length === 0 ? (
        <p className="text-ink-faint mt-4 text-xs">
          Showing the demo basket — add items to your shopping list to run the
          split-cart on real picks.
        </p>
      ) : (
        <p className="text-ink-faint mt-4 text-xs">
          Running the split-cart on your live shopping list ({list.length} items).
        </p>
      )}
    </div>
  );
}