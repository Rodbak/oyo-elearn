"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const baseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Fades + slides children into view once they scroll into the viewport.
 * Falls back to a plain, static div when the user has requested reduced
 * motion (OS-level setting) so the page never feels jarring for them.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.5,
  className,
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={baseVariants}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Convenience helper for grids/lists: wraps each item in its own `Reveal`
 * with a small incremental delay, producing a staggered entrance.
 */
export function Stagger({
  children,
  className,
  itemClassName,
  stagger = 0.08,
}: {
  children: ReactNode[];
  className?: string;
  itemClassName?: string;
  stagger?: number;
}) {
  return (
    <div className={className}>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * stagger} className={itemClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  );
}
