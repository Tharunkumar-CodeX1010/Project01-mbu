"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

interface TabsContextValue {
  baseId: string;
  value: string;
  select: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs components must be used within <Tabs>");
  return ctx;
}

interface TabsProps {
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, onValueChange, children, className }: TabsProps) {
  const baseId = useId().replace(/:/g, "");
  const [value, setValue] = useState(defaultValue);

  const select = useCallback(
    (next: string) => {
      setValue(next);
      onValueChange?.(next);
    },
    [onValueChange]
  );

  return (
    <TabsContext.Provider value={{ baseId, value, select }}>
      <div className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  "aria-label": string;
  className?: string;
  children: ReactNode;
}

export function TabsList({ "aria-label": ariaLabel, className, children }: TabsListProps) {
  const { select } = useTabsContext();

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const tabs = Array.from(
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    );
    const current = tabs.findIndex((tab) =>
      tab.getAttribute("aria-selected") === "true"
    );
    if (current === -1) return;
    let next = -1;
    if (event.key === "ArrowRight") next = (current + 1) % tabs.length;
    if (event.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    if (next === -1) return;
    event.preventDefault();
    const target = tabs[next];
    const nextValue = target.dataset.value;
    if (nextValue) select(nextValue);
    target.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        "flex items-center gap-1 overflow-x-auto rounded-lg border border-edge bg-surface p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabsTrigger({ value, className, children }: TabsTriggerProps) {
  const { baseId, value: selected, select } = useTabsContext();
  const selectedState = selected === value;
  const tabId = `${baseId}-tab-${value}`;
  const panelId = `${baseId}-panel-${value}`;

  return (
    <button
      type="button"
      role="tab"
      id={tabId}
      data-value={value}
      aria-selected={selectedState}
      aria-controls={panelId}
      tabIndex={selectedState ? 0 : -1}
      onClick={() => select(value)}
      className={cn(
        "h-9 shrink-0 rounded-md px-4 text-sm font-medium transition-colors",
        selectedState
          ? "bg-accent text-accent-ink shadow-glow-orange"
          : "text-ink-soft hover:bg-surface-strong hover:text-ink",
        className
      )}
    >
      {children}
    </button>
  );
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabsContent({ value, className, children }: TabsContentProps) {
  const { baseId, value: selected } = useTabsContext();
  if (selected !== value) return null;
  const panelId = `${baseId}-panel-${value}`;
  const tabId = `${baseId}-tab-${value}`;
  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={cn("focus:outline-none", className)}
    >
      {children}
    </div>
  );
}