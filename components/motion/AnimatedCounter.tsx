"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function parseTarget(value: string | number): {
  number: number;
  prefix: string;
  suffix: string;
  decimals: number;
} {
  if (typeof value === "number") {
    return { number: value, prefix: "", suffix: "", decimals: 0 };
  }
  const match = value.match(/^([^\d-]*)([\d,.]+)(.*)$/);
  if (!match) return { number: 0, prefix: "", suffix: value, decimals: 0 };
  const [, prefix, numStr, suffix] = match;
  const clean = numStr.replace(/,/g, "");
  const decimals = clean.includes(".") ? clean.split(".")[1].length : 0;
  return { number: parseFloat(clean), prefix, suffix, decimals };
}

/**
 * Counts up to `value` once it scrolls into view. Accepts formatted strings
 * like "10,000+", "98%", "4.5" — the numeric part animates while any
 * prefix/suffix (currency symbols, "+", "%") stays put.
 */
export function AnimatedCounter({
  value,
  duration = 1.2,
  className,
}: {
  value: string | number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const { number, prefix, suffix, decimals } = parseTarget(value);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setDisplay(number);
      return;
    }

    let start: number | null = null;
    let raf = 0;

    const frame = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Number((eased * number).toFixed(decimals)));
      if (progress < 1) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [isInView, number, duration, decimals, shouldReduceMotion]);

  const formatted = decimals > 0 ? display.toFixed(decimals) : Math.round(display).toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
