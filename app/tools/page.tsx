import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { ConverterPanel } from "@/components/tools/converter-panel";

export const metadata: Metadata = { title: "Unit & Swap" };

export default function ToolsPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/recipes" />
      <PageIntro
        overline="Tools"
        title="Unit & Swap"
        description="Convert units, translate temperatures, scale servings, and look up ingredient substitutions."
      />
      <div className="mt-8">
        <ConverterPanel />
      </div>
    </main>
  );
}