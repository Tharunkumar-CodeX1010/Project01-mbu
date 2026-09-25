import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { ScaffoldNote } from "@/components/shared/scaffold-note";

interface HistorySlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: HistorySlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ") };
}

export default async function HistorySlugPage({ params }: HistorySlugPageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");

  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/history" />
      <PageIntro
        overline="History"
        title={title}
        description="The story of this food — queued for the Food History Engine in Section 15."
      />
      <ScaffoldNote section={15} title="Food History Engine" />
    </main>
  );
}