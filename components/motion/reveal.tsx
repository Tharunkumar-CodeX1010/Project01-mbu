"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useMounted } from "./use-mounted";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/** Scroll-triggered reveal. Static on the server and under reduced motion. */
export function Reveal({ children, className, delay = 0, y = 16 }: RevealProps) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const animate = mounted && !reduced;

  return (
    <motion.div
      className={className}
      initial={animate ? { opacity: 0, y } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}