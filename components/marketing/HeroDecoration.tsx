"use client";

import Image from "next/image";
import { FloatingShape } from "@/components/motion/FloatingShape";
import { Award, Radio, Star, Video } from "lucide-react";

export function HeroDecoration() {
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-md md:h-[460px]" aria-hidden>
      <div className="absolute inset-6 animate-blob rounded-[44%_56%_65%_35%/52%_49%_56%_48%] bg-gradient-to-br from-[#E9E0FF] via-[#F4ECFF] to-[#F9F7FF] opacity-90 md:inset-10" />

      <div className="relative mx-auto h-full w-full overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-neu-extruded">
        <Image
          src="/hero-student.svg"
          alt="Instructor creating a course"
          fill
          unoptimized
          className="object-cover"
          sizes="(min-width: 768px) 420px, 100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <FloatingShape className="left-0 top-6" duration={6} yOffset={10}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-neu-extruded-sm backdrop-blur-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-sky/10 text-badge-sky">
            <Video className="h-4 w-4" />
          </div>
          <div>
            <p className="font-display text-xs font-bold text-foreground">Lesson progress</p>
            <p className="font-body text-[10px] text-muted">12 lessons live</p>
          </div>
        </div>
      </FloatingShape>

      <FloatingShape className="right-0 top-8" duration={7} delay={0.4} yOffset={12}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-neu-extruded-sm backdrop-blur-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-amber/10 text-badge-amber">
            <Award className="h-4 w-4" />
          </div>
          <p className="font-display text-xs font-bold text-foreground">Certificate-ready</p>
        </div>
      </FloatingShape>

      <FloatingShape className="bottom-4 left-4" duration={5.5} delay={0.2} yOffset={9}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-neu-extruded-sm backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/30" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-coral/10 text-badge-coral">
            <Radio className="h-4 w-4" />
          </div>
          <p className="font-display text-xs font-bold text-foreground">Live classroom</p>
        </div>
      </FloatingShape>

      <FloatingShape className="bottom-0 right-6" duration={6.5} delay={0.6} yOffset={11}>
        <div className="flex items-center gap-1.5 rounded-2xl bg-white/95 px-3 py-2 shadow-neu-extruded-sm backdrop-blur-sm">
          <Star className="h-4 w-4 fill-badge-amber text-badge-amber" />
          <p className="font-display text-xs font-bold text-foreground">4.9 rating</p>
        </div>
      </FloatingShape>
    </div>
  );
}
