"use client";

import { FloatingShape } from "@/components/motion/FloatingShape";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Award, GraduationCap, Radio, Star, Video } from "lucide-react";

/**
 * Original hero illustration: a soft gradient blob anchor with floating
 * "product moment" cards (lesson, certificate, live class, rating) around
 * it. Deliberately not a literal photo/illustration of a person — this
 * keeps the visual fully original while still capturing the lively,
 * floating-shapes energy of the reference design.
 */
export function HeroDecoration() {
  const { t } = useLocale();

  return (
    <div className="relative mx-auto h-[360px] w-full max-w-md md:h-[440px]" aria-hidden>
      {/* Organic gradient blob backdrop */}
      <div className="absolute inset-6 animate-blob rounded-[42%_58%_61%_39%/47%_42%_58%_53%] bg-gradient-to-br from-[#FFD7CE] via-[#FBC2D0] to-[#C9D6F7] opacity-90 md:inset-10" />

      {/* Central anchor card */}
      <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-[2rem] bg-background shadow-neu-extruded md:h-40 md:w-40">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent md:h-14 md:w-14">
          <GraduationCap className="h-6 w-6 md:h-7 md:w-7" />
        </div>
        <p className="font-display text-xs font-bold text-foreground md:text-sm">
          {t("landing.tagline")}
        </p>
      </div>

      {/* Floating "lesson" chip */}
      <FloatingShape className="left-0 top-4 md:top-6" duration={6} yOffset={10}>
        <div className="flex items-center gap-2 rounded-2xl bg-background px-3 py-2 shadow-neu-extruded-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-sky/10 text-badge-sky">
            <Video className="h-4 w-4" />
          </div>
          <div>
            <p className="font-display text-xs font-bold text-foreground">Lesson 12</p>
            <p className="font-body text-[10px] text-muted">8 min left</p>
          </div>
        </div>
      </FloatingShape>

      {/* Floating "certificate" chip */}
      <FloatingShape className="right-0 top-0 md:top-2" duration={7} delay={0.4} yOffset={12}>
        <div className="flex items-center gap-2 rounded-2xl bg-background px-3 py-2 shadow-neu-extruded-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-amber/10 text-badge-amber">
            <Award className="h-4 w-4" />
          </div>
          <p className="font-display text-xs font-bold text-foreground">Certificate ready</p>
        </div>
      </FloatingShape>

      {/* Floating "live" chip */}
      <FloatingShape className="bottom-2 left-2 md:bottom-6" duration={5.5} delay={0.2} yOffset={9}>
        <div className="flex items-center gap-2 rounded-2xl bg-background px-3 py-2 shadow-neu-extruded-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sunset" />
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-coral/10 text-badge-coral">
            <Radio className="h-4 w-4" />
          </div>
          <p className="font-display text-xs font-bold text-foreground">Live now</p>
        </div>
      </FloatingShape>

      {/* Floating "rating" chip */}
      <FloatingShape className="bottom-0 right-4 md:bottom-4" duration={6.5} delay={0.6} yOffset={11}>
        <div className="flex items-center gap-1.5 rounded-2xl bg-background px-3 py-2 shadow-neu-extruded-sm">
          <Star className="h-4 w-4 fill-badge-amber text-badge-amber" />
          <p className="font-display text-xs font-bold text-foreground">4.9</p>
          <p className="font-body text-[10px] text-muted">(2.3k)</p>
        </div>
      </FloatingShape>

      {/* Small decorative accent dots */}
      <FloatingShape className="right-10 top-1/3 h-3 w-3 rounded-full bg-badge-violet/70" duration={4} delay={0.3} yOffset={8} />
      <FloatingShape className="left-8 bottom-1/4 h-4 w-4 rounded-full bg-accent-secondary/60" duration={5} delay={0.1} yOffset={10} />
    </div>
  );
}
