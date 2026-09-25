import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { TodayContext } from "@/components/intel/today-context";

export const metadata: Metadata = { title: "AI Assistant" };

export default function AssistantPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Intelligence"
        title="AI Assistant"
        description="A site-bound culinary copilot that answers from this build's own data — recipes, regions, films and technique."
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <AssistantPanel />
        <TodayContext />
      </div>
    </main>
  );
}