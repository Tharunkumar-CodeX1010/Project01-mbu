import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "Food History" };

export default function HistoryPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Story"
        title="Food History"
        description="Origins, timelines, regional evolution and cultural context — with evidence marked, never invented."
      />
      <ScaffoldNote section={15} title="Food History Engine" />
    </main>
  );
}