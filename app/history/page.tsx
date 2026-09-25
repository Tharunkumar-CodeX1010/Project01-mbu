import type { Metadata } from "next";
import { PageIntro } from "@/components/shared/page-intro";
import { BackButton } from "@/components/navigation/back-button";
import { HistoryFilmCard } from "@/components/history/history-film-card";
import { HISTORY_FILMS } from "@/lib/history";

export const metadata: Metadata = { title: "Food History" };

export default function HistoryPage() {
  return (
    <main className="mx-auto w-full max-w-[var(--container-max)] flex-1 px-4 py-10 sm:px-6">
      <BackButton fallbackHref="/" />
      <PageIntro
        overline="Story"
        title="Food History Films"
        description="Short archival episodes about how dishes became history. Video is mocked in this build — scenes and provenance are the record."
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {HISTORY_FILMS.map((film) => (
          <HistoryFilmCard key={film.slug} film={film} />
        ))}
      </div>
    </main>
  );
}