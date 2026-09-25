"use client";

import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

interface SearchBarProps {
  label?: string;
  placeholder?: string;
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
  onSearch: (query: string) => void;
}

export function SearchBar({
  label = "Search",
  placeholder = "Search...",
  defaultValue = "",
  autoFocus = false,
  className,
  onSearch,
}: SearchBarProps) {
  const autoId = useId();
  const inputId = autoId;
  const [value, setValue] = useState(defaultValue);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn("flex w-full items-center gap-2", className)}
    >
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        type="search"
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-12 w-full flex-1 rounded-lg border border-edge bg-surface px-4 text-base text-ink shadow-glass backdrop-blur-md placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
      />
      {value ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue("");
            onSearch("");
          }}
          className="text-ink-faint hover:text-ink"
        >
          ✕
        </button>
      ) : null}
      <button
        type="submit"
        className="bg-accent text-accent-ink shadow-glow-orange h-12 rounded-lg px-5 text-sm font-medium transition-colors hover:bg-accent-strong"
      >
        Search
      </button>
    </form>
  );
}