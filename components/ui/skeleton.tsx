import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function Skeleton({ className, label, ...props }: SkeletonProps) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "animate-tac-shimmer rounded-md bg-surface-solid",
          className
        )}
        {...props}
      />
      {label ? <span className="sr-only">{label}</span> : null}
    </>
  );
}