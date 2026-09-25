import { cn } from "@/lib/cn";

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({
  label = "Loading...",
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center justify-center gap-3 px-6 py-12",
        className
      )}
    >
      <span
        aria-hidden="true"
        className="border-accent border-r-transparent animate-tac-spin h-8 w-8 rounded-full border-2"
      />
      <span className="sr-only">{label}</span>
      <p className="text-ink-faint text-sm">{label}</p>
    </div>
  );
}