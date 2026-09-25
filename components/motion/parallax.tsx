"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { useMounted } from "./use-mounted";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Visual drift intensity. Positive moves against scroll. */
  speed?: number;
}

/** Subtle scroll parallax. Disabled under reduced motion; static on the server. */
export function Parallax({ children, className, speed = 0.2 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -60, speed * 60]);

  return (
    <motion.div ref={ref} className={className} style={mounted && !reduced ? { y } : undefined}>
      {children}
    </motion.div>
  );
}