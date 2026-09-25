import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "Recipes" };

export default function RecipesPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Masterclass"
        title="Recipes"
        description="Data-driven cooking masterclasses — story, technique, steps, video and related dishes."
      />
      <ScaffoldNote section={10} title="Recipe Masterclass Engine" />
    </main>
  );
}