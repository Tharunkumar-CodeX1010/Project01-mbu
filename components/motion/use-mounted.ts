import { useSyncExternalStore } from "react";

/**
 * SSR-safe client-only flag via useSyncExternalStore.
 *
 * The server cannot know prefers-reduced-motion, so motion components that
 * hide content with `initial={{ opacity: 0 }}` must NOT emit that inline style
 * during SSR (it causes React hydration mismatch errors in dev and can leave
 * content invisible for reduced-motion users). Use `useMounted()` as a gate:
 * render statically until the client flips the module flag, then animate.
 */

let mounted = false;
const listeners = new Set<() => void>();

function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  queueMicrotask(() => {
    mounted = true;
    listeners.forEach((listener) => listener());
  });
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): boolean {
  return mounted;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}