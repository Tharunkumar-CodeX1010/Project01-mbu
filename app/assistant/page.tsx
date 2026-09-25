import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "AI Assistant" };

export default function AssistantPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Intelligence"
        title="AI Assistant"
        description="A site-bound culinary copilot that understands the page, the recipe, your kitchen and food history."
      />
      <ScaffoldNote section={25} title="YUMMYGO AI Assistant" />
    </main>
  );
}