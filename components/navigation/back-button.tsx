"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  fallbackHref?: string;
}

export function BackButton({ fallbackHref = "/" }: BackButtonProps) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window === "undefined") return;
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className="text-ink-soft inline-flex items-center gap-1.5 text-sm transition-colors hover:text-ink"
    >
      <span aria-hidden="true">←</span> Back
    </button>
  );
}