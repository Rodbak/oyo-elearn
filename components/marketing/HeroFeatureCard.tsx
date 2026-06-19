"use client";

import Image from "next/image";
import { Globe } from "lucide-react";
import { FloatingShape } from "@/components/motion/FloatingShape";

export function HeroFeatureCard({ className }: { className?: string }) {
  return (
    <FloatingShape className={className ?? "right-0 top-8"} duration={7} delay={0.2} yOffset={10}>
      <div className="w-[220px] max-w-[46vw] md:w-64 rounded-2xl bg-white/95 shadow-neu-extruded p-4 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
            <Globe className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-display text-sm font-bold text-foreground">Global classrooms</p>
            <p className="mt-0.5 font-body text-xs text-muted">Connect learners worldwide</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center">
          <div className="relative h-20 w-28 overflow-hidden rounded-lg border border-surface-border">
            <Image src="/hero-student.svg" alt="illustration" fill unoptimized className="object-cover" />
          </div>
        </div>
      </div>
    </FloatingShape>
  );
}

export default HeroFeatureCard;
