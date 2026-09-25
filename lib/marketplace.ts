/**
 * Marketplace architecture (MOCKED end-to-end demo).
 *
 * Real grocery/provider APIs are BLOCKED_EXTERNAL_DEPENDENCY. This module
 * models the split-cart decision with deterministic seeded prices so the
 * browsing UX, ranking and honest "demo" labeling remain truthful.
 */

export interface Provider {
  id: string;
  name: string;
  kind: "grocery" | "local-market" | "butcher" | "fishmonger" | "spice";
  baseFee: number;
  speedLabel: string;
}

export const MOCKED_PROVIDERS: Provider[] = [
  { id: "mercato", name: "Mercato Urbano", kind: "local-market", baseFee: 1.2, speedLabel: "same-day" },
  { id: "spice-row", name: "Spice Row Co-op", kind: "spice", baseFee: 0.8, speedLabel: "2-day" },
  { id: "wellspring", name: "Wellspring Grocers", kind: "grocery", baseFee: 2.0, speedLabel: "next-day" },
  { id: "harbor-fresh", name: "Harbor Fishmongers", kind: "fishmonger", baseFee: 1.5, speedLabel: "same-day" },
  { id: "totelo", name: "Tôtelô Butchers", kind: "butcher", baseFee: 1.5, speedLabel: "same-day" },
];

export function seededPrice(item: string, providerId: string): number {
  let hash = 7;
  const seed = `${providerId}|${item.toLowerCase()}`;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 997;
  }
  return 1.25 + (hash % 390) / 100;
}

export interface LineAllocation {
  item: string;
  providerId: string;
  providerName: string;
  unitPrice: number;
  qty: number;
  lineCost: number;
}

export function cheapestProviderFor(item: string): string {
  let best = MOCKED_PROVIDERS[0].id;
  let bestPrice = Infinity;
  for (const provider of MOCKED_PROVIDERS) {
    const price = seededPrice(item, provider.id);
    if (price < bestPrice) {
      bestPrice = price;
      best = provider.id;
    }
  }
  return best;
}

export interface SplitCart {
  allocations: LineAllocation[];
  subtotal: number;
  fees: number;
  totalBeforeCheckout: number;
}

/** Distribute each shopping-line to its cheapest mock provider. */
export function splitCart(
  lines: { item: string; qty: number }[],
  providers: Provider[] = MOCKED_PROVIDERS
): SplitCart {
  const allocations: LineAllocation[] = lines.map((line) => {
    const providerId = cheapestProviderFor(line.item);
    const provider = providers.find((p) => p.id === providerId) ?? MOCKED_PROVIDERS[0];
    const unitPrice = seededPrice(line.item, providerId);
    return {
      item: line.item,
      providerId,
      providerName: provider.name,
      unitPrice,
      qty: line.qty,
      lineCost: +(unitPrice * line.qty).toFixed(2),
    };
  });

  const feesById = new Map<string, number>();
  for (const alloc of allocations) {
    const provider = providers.find((p) => p.id === alloc.providerId) ?? MOCKED_PROVIDERS[0];
    if (!feesById.has(provider.id)) feesById.set(provider.id, provider.baseFee);
  }
  const fees = Array.from(feesById.values()).reduce((a, b) => a + b, 0);
  const subtotal = +allocations.reduce((a, b) => a + b.lineCost, 0).toFixed(2);

  return {
    allocations,
    subtotal,
    fees: +fees.toFixed(2),
    totalBeforeCheckout: +(subtotal + fees).toFixed(2),
  };
}

export const MARKETPLACE_STATUS =
  "MOCKED — provider prices are deterministic demo seeds. Live checkouts and supplier contracts are BLOCKED_EXTERNAL_DEPENDENCY.";