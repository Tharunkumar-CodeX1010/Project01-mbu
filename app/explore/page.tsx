import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "Explore" };

export default function ExplorePage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Discover"
        title="Explore"
        description="Regional cuisine discovery engine — Naples, Tokyo, Oaxaca, Lucknow and every culinary hub beyond."
      />
      <ScaffoldNote section={8} title="Regional Discovery Engine" />
    </main>
  );
}