"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMounted } from "./use-mounted";

/** Runs per navigation via app/template.tsx; static until mounted. */
export function PageTransition({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const animate = mounted && !reduced;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 6 } : false}
      animate={animate ? { opacity: 1, y: 0 } : false}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}