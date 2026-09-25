import { cn } from "@/lib/cn";

interface PosterImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

/** Big-frame procedural poster. `className` controls layout (fills parent). */
export function PosterImage({ src, alt, className, priority = false }: PosterImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Procedural in-repo SVG posters are static; next/image optimization is unnecessary.
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}