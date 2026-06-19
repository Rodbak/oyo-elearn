"use client";

import { Globe } from "lucide-react";
import { FloatingShape } from "@/components/motion/FloatingShape";

export function HeroFeatureCard({ className }: { className?: string }) {
  return (
    <FloatingShape className={className ?? "right-0 top-8"} duration={7} delay={0.2} yOffset={10}>
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/95 shadow-neu-extruded-sm backdrop-blur-sm ring-1 ring-slate-200/60">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Globe className="h-8 w-8" />
        </div>
      </div>
    </FloatingShape>
  );
}

export default HeroFeatureCard;
