import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { IngredientLibrary } from "@/components/ingredients/ingredient-library";

export const metadata: Metadata = { title: "Ingredient Library" };

export default function IngredientsPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/dishes" />
      <PageIntro
        overline="Intelligence"
        title="Ingredient Library"
        description="Flavor, season, storage and pairing knowledge for the pantry that powers our recipes. Queryable by name."
      />
      <div className="mt-8">
        <IngredientLibrary />
      </div>
    </main>
  );
}