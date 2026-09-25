import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { CollectionsPanel } from "@/components/collection/collections-panel";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/dishes" />
      <PageIntro
        overline="Collection"
        title="Your Dishes"
        description="Saved favorites, freeform notes, and forked adaptations — all kept in this browser."
      />
      <div className="mt-8">
        <CollectionsPanel />
      </div>
    </main>
  );
}