"use client";

import { FloatingShape } from "@/components/motion/FloatingShape";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Flame, Radio, TrendingUp } from "lucide-react";

/* Weekly study-hours data for the chart (today highlighted) */
const WEEK = [
  { d: "M", v: 42 },
  { d: "T", v: 68 },
  { d: "W", v: 55 },
  { d: "T", v: 84 },
  { d: "F", v: 60 },
  { d: "S", v: 96, today: true },
  { d: "S", v: 38 },
];

/* Overlapping learner avatars (gradient + initials, no external images) */
const AVATARS = [
  { i: "AO", c: "from-badge-violet to-badge-sky" },
  { i: "JK", c: "from-badge-coral to-badge-amber" },
  { i: "MN", c: "from-badge-sky to-accent" },
  { i: "RT", c: "from-accent to-badge-violet" },
];

export function HeroDecoration() {
  const { t } = useLocale();
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-md md:h-[480px]" aria-hidden>
      {/* Soft organic backdrop */}
      <div className="absolute inset-4 animate-blob rounded-[44%_56%_65%_35%/52%_49%_56%_48%] bg-gradient-to-br from-[#E9E0FF] via-[#F4ECFF] to-[#F9F7FF] opacity-90 md:inset-8" />

      {/* ── Dashboard card ───────────────────────────────────────── */}
      <div className="relative mx-auto flex h-full w-full flex-col gap-4 overflow-hidden rounded-[2rem] border border-white/70 bg-white/95 p-5 shadow-neu-extruded backdrop-blur-sm md:p-6">

        {/* Header: learner identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-badge-violet font-display text-sm font-extrabold text-white shadow-neu-extruded-sm">
            AO
          </div>
          <div>
            <p className="font-display text-sm font-bold text-foreground">Amara&nbsp;O.</p>
            <p className="font-body text-[11px] text-muted">{t("landing.heroDecoration.track")}</p>
          </div>
        </div>

        {/* Chart panel */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-50 to-white p-4 shadow-neu-inset">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="font-body text-[11px] font-medium text-muted">{t("landing.heroDecoration.studyHours")}</p>
              <p className="font-display text-xl font-extrabold text-foreground">
                14.5<span className="ml-0.5 text-xs font-bold text-muted">h</span>
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-badge-mint/12 px-2 py-1 font-display text-[11px] font-bold text-accent">
              <TrendingUp className="h-3 w-3" /> +18%
            </span>
          </div>

          {/* Bars */}
          <div className="flex h-24 items-end justify-between gap-2 md:h-28">
            {WEEK.map((b, i) => (
              <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <div
                  className={`w-full rounded-lg ${
                    b.today
                      ? "bg-gradient-to-t from-accent to-accent-light shadow-[0_4px_10px_rgba(108,99,255,0.35)]"
                      : "bg-accent/15"
                  }`}
                  style={{ height: `${b.v}%` }}
                />
                <span className={`font-body text-[10px] ${b.today ? "font-bold text-accent" : "text-muted"}`}>
                  {b.d}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer: classmates learning now */}
        <div className="mt-auto flex items-center justify-between rounded-2xl bg-white p-3 shadow-neu-extruded-sm">
          <div className="flex items-center">
            <div className="flex -space-x-2.5">
              {AVATARS.map((a) => (
                <div
                  key={a.i}
                  className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${a.c} font-display text-[9px] font-bold text-white ring-2 ring-white`}
                >
                  {a.i}
                </div>
              ))}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-display text-[9px] font-bold text-muted ring-2 ring-white">
                +9
              </div>
            </div>
          </div>
          <p className="font-body text-[11px] font-medium text-muted">
            <span className="font-display font-bold text-foreground">2.4k</span> {t("landing.heroDecoration.learningNow")}
          </p>
        </div>
      </div>

      {/* ── Floating chips (framing accents) ─────────────────────── */}
      <FloatingShape className="-right-3 top-8" duration={7} delay={0.4} yOffset={12}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-neu-extruded backdrop-blur-sm">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-amber/12 text-badge-amber">
            <Flame className="h-4 w-4" />
          </div>
          <div>
            <p className="font-display text-xs font-bold text-foreground">{t("landing.heroDecoration.streak")}</p>
            <p className="font-body text-[10px] text-muted">{t("landing.heroDecoration.streakSub")}</p>
          </div>
        </div>
      </FloatingShape>

      <FloatingShape className="-left-3 bottom-24" duration={5.5} delay={0.2} yOffset={10}>
        <div className="flex items-center gap-2 rounded-2xl bg-white/95 px-3 py-2 shadow-neu-extruded backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sunset/30" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sunset" />
          </span>
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-badge-coral/12 text-badge-coral">
            <Radio className="h-4 w-4" />
          </div>
          <p className="font-display text-xs font-bold text-foreground">{t("landing.heroDecoration.liveClassroom")}</p>
        </div>
      </FloatingShape>
    </div>
  );
}
