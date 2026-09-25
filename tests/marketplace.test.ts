// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import {
  MOCKED_PROVIDERS,
  cheapestProviderFor,
  seededPrice,
  splitCart,
} from "@/lib/marketplace";

describe("marketplace split-cart", () => {
  it("is deterministic for the same item and provider", () => {
    expect(seededPrice("Basmati rice", "mercato")).toBe(seededPrice("Basmati rice", "mercato"));
    expect(seededPrice("Basmati rice", "mercato")).not.toBe(seededPrice("Basmati rice", "harbor-fresh"));
  });

  it("always returns one of the providers as cheapest", () => {
    const ids = MOCKED_PROVIDERS.map((p) => p.id);
    expect(ids).toContain(cheapestProviderFor("Saffron"));
    expect(ids).toContain(cheapestProviderFor("Kombu"));
  });

  it("allocates each line and accounts totals", () => {
    const cart = splitCart([
      { item: "Basmati rice", qty: 2 },
      { item: "Saffron", qty: 1 },
      { item: "Kombu", qty: 3 },
    ]);
    expect(cart.allocations).toHaveLength(3);
    expect(cart.subtotal).toBeGreaterThan(0);
    expect(cart.fees).toBeGreaterThan(0);
    expect(cart.totalBeforeCheckout).toBe(cart.subtotal + cart.fees);
    for (const alloc of cart.allocations) {
      expect(MOCKED_PROVIDERS.map((p) => p.id)).toContain(alloc.providerId);
    }
  });
});