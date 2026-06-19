"use client";

import { FloatingShape } from "@/components/motion/FloatingShape";

export function HeroFeatureCard({ className }: { className?: string }) {
  // Render a neutral decorative floating shape instead of the globe.
  return (
    <FloatingShape className={className ?? "right-0 top-8"} duration={7} delay={0.2} yOffset={10}>
      <div className="flex h-24 w-24 items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-gradient-to-br from-accent/10 to-transparent shadow-md" />
      </div>
    </FloatingShape>
  );
}

export default HeroFeatureCard;
