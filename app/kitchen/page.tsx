import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { KitchenProfilePanel } from "@/components/kitchen/kitchen-profile-panel";

export const metadata: Metadata = { title: "Kitchen" };

export default function KitchenPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Your Space"
        title="Kitchen Profile"
        description="Skill, equipment, pantry and household — the context that makes recipes yours. Saved locally in this browser."
      />
      <div className="mt-8">
        <KitchenProfilePanel />
      </div>
    </main>
  );
}