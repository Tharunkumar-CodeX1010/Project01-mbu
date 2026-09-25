import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { ScaffoldNote } from "@/components/shared/scaffold-note";
import { PageIntro } from "@/components/shared/page-intro";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Preferences"
        title="Settings"
        description="Appearance, location consent, data retention and connected integrations."
      />
      <ScaffoldNote section={24} title="Location Intelligence" />
    </main>
  );
}