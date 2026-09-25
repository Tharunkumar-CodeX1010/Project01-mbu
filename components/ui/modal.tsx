"use client";

import { useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useDialogBehavior, useMounted } from "./use-dialog";

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
}: ModalProps) {
  const mounted = useMounted();
  const autoId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = `${autoId}-title`;
  const descId = `${autoId}-description`;

  useDialogBehavior(open, panelRef, () => onOpenChange(false));

  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={(e) => {
          if (e.target === e.currentTarget) onOpenChange(false);
        }}
        className="animate-tac-fade-in absolute inset-0 h-full w-full bg-black/60 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className={cn(
          "animate-tac-fade-in-up relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg border border-edge bg-elevated p-6 shadow-elevated focus:outline-none",
          className
        )}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-ink text-xl font-semibold tracking-tight">
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
            className="text-ink-faint transition-colors hover:text-ink"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}