"use client";

import { ErrorState } from "@/components/ui";

export default function RootError({ reset }: { reset: () => void }) {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <ErrorState
        title="Something went wrong"
        description="The page could not be rendered. You can retry, or return to the homepage."
        retryLabel="Retry"
        onRetry={reset}
        className="min-h-[40vh] w-full max-w-md"
      />
    </main>
  );
}