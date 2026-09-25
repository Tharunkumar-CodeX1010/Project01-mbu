"use client";

import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useDialogBehavior, useMounted } from "./use-dialog";

type Side = "left" | "right";

interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  side?: Side;
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Drawer({
  open,
  onOpenChange,
  title,
  description,
  side = "right",
  id,
  children,
  className,
}: DrawerProps) {
  const mounted = useMounted();
  const autoId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = `${autoId}-title`;
  const descId = `${autoId}-description`;

  useDialogBehavior(open, panelRef, () => onOpenChange(false));

  if (!mounted || !open) return null;

  const align = side === "right" ? "right-0" : "left-0";

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) onOpenChange(false);
        }}
        className="animate-tac-fade-in absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        id={id}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          "animate-tac-slide-in-right absolute inset-y-0 flex w-full max-w-md flex-col border-edge bg-elevated shadow-elevated focus:outline-none",
          side === "right" ? "rounded-l-lg border-r" : "rounded-r-lg border-l",
          align,
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-edge p-5">
          <div>
            <h2 id={titleId} className="text-ink text-lg font-semibold tracking-tight">
              {title}
            </h2>
            {description ? (
              <p id={descId} className="text-ink-soft mt-1 text-sm">
                {description}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="rounded-md p-1 text-ink-faint transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}