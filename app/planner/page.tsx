import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { MealPlanner } from "@/components/planner/meal-planner";

export const metadata: Metadata = { title: "Meal & Pantry Planner" };

export default function PlannerPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Planning"
        title="Meal & Pantry Planner"
        description="Sketch a week, see the grocery aggregate, push it to your shopping list. Pantry-aware auto-suggestions arrive with the assistant."
      />
      <div className="mt-8">
        <MealPlanner />
      </div>
    </main>
  );
}