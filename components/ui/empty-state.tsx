import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-edge px-6 py-12 text-center",
        className
      )}
    >
      {icon ? <div aria-hidden="true" className="text-ink-faint text-4xl">{icon}</div> : null}
      <h3 className="text-ink text-base font-semibold">{title}</h3>
      {description ? (
        <p className="text-ink-soft max-w-sm text-sm">{description}</p>
      ) : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}