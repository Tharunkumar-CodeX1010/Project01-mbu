import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { DishArchive } from "@/components/dish/dish-archive";

export const metadata: Metadata = { title: "Dishes" };

export default function DishesPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Archive"
        title="Dish Archive"
        description="Every mastered dish, browsable by region and vein — searchable, openable as a full masterclass."
      />
      <div className="mt-8">
        <DishArchive />
      </div>
    </main>
  );
}