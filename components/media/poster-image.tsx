"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

interface PosterImageProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/**
 * Big-frame image with a self-contained fallback. `src` is the photo (e.g. a
 * Wikimedia Commons URL); if it fails to load, `fallback` (a procedural SVG
 * poster) renders instead. `className` controls layout (fills parent).
 */
export function PosterImage({ src, fallback, alt, className, priority = false }: PosterImageProps) {
  const [errored, setErrored] = useState(false);
  const showFallback = errored && Boolean(fallback);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Remote photos and in-repo SVG posters are static; next/image optimization is unnecessary and would require external host config.
    <img
      src={showFallback ? fallback : src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (!showFallback) setErrored(true);
      }}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}