"use client";

import { cn } from "@/lib/cn";

interface ErrorStateProps {
  title?: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Try again, or refresh the page.",
  retryLabel = "Try again",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-red-500/30 bg-red-500/5 px-6 py-12 text-center",
        className
      )}
    >
      <div aria-hidden="true" className="text-3xl">⚠</div>
      <h3 className="text-ink text-base font-semibold">{title}</h3>
      <p className="text-ink-soft max-w-sm text-sm">{description}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="bg-accent text-accent-ink mt-2 h-9 rounded-md px-4 text-sm font-medium transition-colors hover:bg-accent-strong"
        >
          {retryLabel}
        </button>
      ) : null}
    </div>
  );
}