import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { ShoppingListPanel } from "@/components/shopping/shopping-list-panel";

export const metadata: Metadata = { title: "Shopping List" };

export default function ShoppingPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/recipes" />
      <PageIntro
        overline="Market · Basket"
        title="Shopping List"
        description="Ingredients from your chosen masterclasses, checked off as you shop. Managed locally in this browser."
      />
      <div className="mt-8">
        <ShoppingListPanel />
      </div>
    </main>
  );
}