import type { Metadata } from "next";
import { BackButton } from "@/components/navigation/back-button";
import { PageIntro } from "@/components/shared/page-intro";
import { ScaffoldNote } from "@/components/shared/scaffold-note";

interface RecipeSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: RecipeSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: slug.replace(/-/g, " ") };
}

export default async function RecipeSlugPage({ params }: RecipeSlugPageProps) {
  const { slug } = await params;
  const title = slug.replace(/-/g, " ");

  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/recipes" />
      <PageIntro
        overline="Recipe"
        title={title}
        description="This dish is queued. Its full masterclass lands in Section 10."
      />
      <ScaffoldNote section={10} title="Recipe Masterclass Engine" />
    </main>
  );
}