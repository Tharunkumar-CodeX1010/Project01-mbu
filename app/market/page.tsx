import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "Market" };

export default function MarketPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Shop"
        title="Market"
        description="Ingredient search, product matching, price matrix and split-cart optimization across providers."
      />
      <ScaffoldNote section={20} title="Marketplace Architecture" />
    </main>
  );
}