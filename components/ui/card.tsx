import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type CardVariant = "glass" | "surface" | "elevated";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  interactive?: boolean;
  padded?: boolean;
}

const variants: Record<CardVariant, string> = {
  glass: "border border-edge bg-surface backdrop-blur-md",
  surface: "border border-edge bg-elevated",
  elevated: "border border-edge bg-surface-solid shadow-card",
};

export function Card({
  className,
  variant = "glass",
  interactive = false,
  padded = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg shadow-glass",
        variants[variant],
        padded && "p-5",
        interactive &&
          "transition-all duration-[var(--motion-duration-normal)] ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-1 hover:shadow-card",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-ink text-lg font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-ink-soft mt-1 text-sm leading-relaxed", className)} {...props} />
  );
}