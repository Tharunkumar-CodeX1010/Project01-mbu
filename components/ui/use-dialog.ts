"use client";

import { useEffect, useSyncExternalStore, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

function focusablesWithin(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
  ).filter((node) => node.getAttribute("aria-hidden") !== "true");
}

const emptySubscribe = () => () => {};

/** SSR-safe mount guard so portals render client-side only. */
export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

/**
 * Accessible dialog behavior: focus trap, Escape-to-close, scroll lock,
 * focus restoration on close.
 */
export function useDialogBehavior(
  open: boolean,
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  useEffect(() => {
    if (!open) return;
    const container = ref.current;
    if (!container) return;

    const previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const items = focusablesWithin(container);
    (items[0] ?? container).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = focusablesWithin(container);
      if (focusable.length === 0) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || active === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previous?.focus?.();
    };
  }, [open, ref, onClose]);
}