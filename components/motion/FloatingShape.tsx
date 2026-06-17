"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

/**
 * A decorative, absolutely-positioned element that gently floats/rotates
 * forever. Used to build illustrated hero compositions (e.g. the small
 * triangle/blob/icon-chip shapes around a hero illustration). Respects
 * prefers-reduced-motion by simply staying still.
 */
export function FloatingShape({
  children,
  className,
  duration = 6,
  delay = 0,
  yOffset = 14,
  style,
}: {
  children?: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  yOffset?: number;
  style?: CSSProperties;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("absolute", className)}
      style={style}
      aria-hidden
      animate={shouldReduceMotion ? undefined : { y: [0, -yOffset, 0], rotate: [0, 3, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
