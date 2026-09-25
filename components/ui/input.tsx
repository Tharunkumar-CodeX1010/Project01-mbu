import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, hint, error, id, ...props },
  ref
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = [error ? `${inputId}-error` : null, hint ? `${inputId}-hint` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-ink-soft text-sm font-medium">
          {label}
        </label>
      ) : null}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(
          "h-10 w-full rounded-md border bg-elevated px-3 text-sm text-ink transition-colors",
          "placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent",
          error ? "border-red-500/60" : "border-edge",
          className
        )}
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="text-ink-faint text-xs">
          {hint}
        </p>
      ) : null}
    </div>
  );
});