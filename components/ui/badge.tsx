import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type BadgeVariant = "neutral" | "orange" | "green" | "outline";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  neutral: "border border-edge bg-surface text-ink-soft",
  orange: "border border-accent/30 bg-accent/15 text-accent-strong",
  green: "border border-green/30 bg-green/15 text-green",
  outline: "border border-edge-strong text-ink-soft",
};

export function Badge({ className, variant = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}