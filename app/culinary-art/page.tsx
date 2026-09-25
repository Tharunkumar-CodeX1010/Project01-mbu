import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "Culinary Art" };

export default function CulinaryArtPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Craft"
        title="Culinary Art"
        description="Knife skills, plating, flavor, texture, sauces, fermentation, baking and gastronomy."
      />
      <ScaffoldNote section={17} title="Culinary Art Hub" />
    </main>
  );
}