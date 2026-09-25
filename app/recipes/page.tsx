import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { RecipesBrowser } from "@/components/recipe/recipes-browser";
import { RECIPES } from "@/config/recipes";
import { REGIONS } from "@/config/regions";

export const metadata: Metadata = { title: "Recipes" };

interface RecipesPageProps {
  searchParams: Promise<{ region?: string; q?: string; order?: string }>;
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  const region = REGIONS.find((r) => r.slug === params.region);

  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Masterclass"
        title="Recipe Index"
        description="Sixteen masterclasses drawn from regions across the eight culinary veins — each with story, ingredients, technique and honest notes."
      />
      <div className="mt-8">
        <RecipesBrowser
          recipes={RECIPES}
          regions={REGIONS.map((r) => ({ slug: r.slug, name: r.name }))}
          initialRegion={region?.slug}
          initialQuery={params.q}
          initialMode={params.order}
        />
      </div>
    </main>
  );
}