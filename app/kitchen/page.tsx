import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "Kitchen" };

export default function KitchenPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Your Space"
        title="Kitchen"
        description="Your equipment, pantry, skill and household — the context that makes recipes yours."
      />
      <ScaffoldNote section={13} title="Kitchen Profile" />
    </main>
  );
}