"use client";

import { Globe } from "lucide-react";
import { FloatingShape } from "@/components/motion/FloatingShape";

/**
 * A floating "globe" near the hero title: a real stock photo of learners
 * clipped into a sphere, with an atmospheric sheen, meridian lines and a
 * soft glow. Replaces the old flat feature card.
 */
export function HeroFeatureCard({ className }: { className?: string }) {
  return (
    <FloatingShape
      className={className ?? "right-0 top-8"}
      duration={7}
      delay={0.2}
      yOffset={12}
    >
      <div className="relative flex flex-col items-center">
        {/* Soft ambient glow behind the globe */}
        <div className="absolute -inset-6 -z-10 rounded-full bg-gradient-to-br from-accent/30 via-badge-sky/20 to-sunset/20 blur-2xl" />

        {/* The globe */}
        <div className="relative h-40 w-40 md:h-48 md:w-48">
          {/* Photo sphere */}
          <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_20px_45px_-15px_rgba(76,70,200,0.55)] ring-[3px] ring-white/70">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=480&q=80"
              alt="Diverse students learning together online"
              className="h-full w-full object-cover"
              loading="lazy"
            />

            {/* Spherical shading: darker rim, lit top-left */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_45%),radial-gradient(circle_at_70%_80%,rgba(20,16,60,0.45),transparent_55%)]" />
            {/* Cool atmosphere tint */}
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-accent/10 to-badge-sky/20 mix-blend-overlay" />

            {/* Meridian / latitude lines to read as a globe */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full text-white/35"
              viewBox="0 0 100 100"
              fill="none"
              aria-hidden
            >
              <circle cx="50" cy="50" r="49" stroke="currentColor" strokeWidth="0.6" />
              <ellipse cx="50" cy="50" rx="20" ry="49" stroke="currentColor" strokeWidth="0.6" />
              <ellipse cx="50" cy="50" rx="38" ry="49" stroke="currentColor" strokeWidth="0.6" />
              <line x1="1" y1="50" x2="99" y2="50" stroke="currentColor" strokeWidth="0.6" />
              <path d="M6 30 H94" stroke="currentColor" strokeWidth="0.5" />
              <path d="M6 70 H94" stroke="currentColor" strokeWidth="0.5" />
            </svg>
          </div>

          {/* Orbiting badge */}
          <div className="absolute -right-2 -top-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-accent shadow-neu-extruded-sm ring-1 ring-white/60 backdrop-blur-sm">
            <Globe className="h-5 w-5" />
          </div>
        </div>

        {/* Caption pill */}
        <div className="mt-3 rounded-2xl bg-white/90 px-3 py-2 text-center shadow-neu-extruded-sm ring-1 ring-white/60 backdrop-blur-sm">
          <p className="font-display text-xs font-bold text-foreground">Global classrooms</p>
          <p className="mt-0.5 font-body text-[10px] text-muted">Connect learners worldwide</p>
        </div>
      </div>
    </FloatingShape>
  );
}

export default HeroFeatureCard;
