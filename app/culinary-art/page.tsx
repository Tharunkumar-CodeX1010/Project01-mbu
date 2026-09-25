import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { CulinaryArtHub } from "@/components/culinary/culinary-art-hub";

export const metadata: Metadata = { title: "Culinary Art" };

export default function CulinaryArtPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Craft"
        title="Culinary Art"
        description="Technique, not just recipes. Knife, fire, sauce, fermentation, baking and plating — each linked to a live masterclass to practice in."
      />
      <div className="mt-8">
        <CulinaryArtHub />
      </div>
    </main>
  );
}