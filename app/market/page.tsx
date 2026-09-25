import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { MarketplaceSimulator } from "@/components/market/marketplace-simulator";

export const metadata: Metadata = { title: "Market" };

export default function MarketPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Shop"
        title="Market"
        description="Ingredient search, product matching, price matrix and split-cart optimization across providers. Checkout connects externally."
      />
      <div className="mt-8">
        <MarketplaceSimulator />
      </div>
    </main>
  );
}