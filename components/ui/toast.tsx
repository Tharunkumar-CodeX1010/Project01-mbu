"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useMounted } from "./use-dialog";

export type ToastVariant = "info" | "success" | "error" | "accent";

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextValue {
  toast: (toast: Omit<ToastItem, "id">) => void;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}

const variantStyles: Record<ToastVariant, string> = {
  info: "border-edge",
  success: "border-green/40",
  error: "border-red-500/40",
  accent: "border-accent/40",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (item: Omit<ToastItem, "id">) => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current.slice(-3), { ...item, id }]);
      window.setTimeout(() => dismiss(id), 5000);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {mounted
        ? createPortal(
            <div
              aria-live="polite"
              className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-end gap-2 px-4 sm:right-4 sm:left-auto"
            >
              {toasts.map((t) => (
                <div
                  key={t.id}
                  role={t.variant === "error" ? "alert" : "status"}
                  className={cn(
                    "animate-tac-fade-in-up pointer-events-auto flex w-full max-w-sm items-start justify-between gap-3 rounded-lg border bg-elevated p-4 shadow-elevated",
                    variantStyles[t.variant ?? "info"]
                  )}
                >
                  <div>
                    <p className="text-ink text-sm font-medium">{t.title}</p>
                    {t.description ? (
                      <p className="text-ink-soft mt-0.5 text-xs">{t.description}</p>
                    ) : null}
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={() => dismiss(t.id)}
                    className="text-ink-faint transition-colors hover:text-ink"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>,
            document.body
          )
        : null}
    </ToastContext.Provider>
  );
}