"use client";

import { FloatingShape } from "@/components/motion/FloatingShape";

/**
 * A molten, floating globe — a glowing sphere of flowing lava that drifts
 * gently beside the hero title. Built from layered SVG radial gradients,
 * slowly-rotating "lava" cells, glowing fissures and a pulsing heat halo.
 * Animations live inside the SVG (scoped) and respect prefers-reduced-motion.
 */
export function HeroFeatureCard({ className }: { className?: string }) {
  return (
    <FloatingShape className={className ?? "right-0 top-8"} duration={7} delay={0.2} yOffset={12}>
      <svg
        viewBox="0 0 200 200"
        role="img"
        aria-label="Molten globe"
        style={{
          width: 132,
          height: 132,
          display: "block",
          filter: "drop-shadow(0 14px 28px rgba(232, 72, 85, 0.35))",
        }}
      >
        <style>{`
          .mg-halo { transform-box: fill-box; transform-origin: center; animation: mgPulse 4.2s ease-in-out infinite; }
          .mg-lava { transform-box: fill-box; transform-origin: center; animation: mgSpin 18s linear infinite; }
          .mg-crust { transform-box: fill-box; transform-origin: center; animation: mgSpin 24s linear infinite reverse; }
          .mg-cracks { animation: mgFlicker 2.6s ease-in-out infinite; }
          @keyframes mgSpin { to { transform: rotate(360deg); } }
          @keyframes mgPulse { 0%,100% { transform: scale(1); opacity: .85; } 50% { transform: scale(1.08); opacity: 1; } }
          @keyframes mgFlicker { 0%,100% { opacity: .95; } 40% { opacity: .6; } 70% { opacity: 1; } }
          @media (prefers-reduced-motion: reduce) {
            .mg-halo, .mg-lava, .mg-crust, .mg-cracks { animation: none; }
          }
        `}</style>
        <defs>
          {/* Spherical body shading */}
          <radialGradient id="mgBody" cx="38%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#FFE08A" />
            <stop offset="22%" stopColor="#FFB020" />
            <stop offset="52%" stopColor="#FF6B6B" />
            <stop offset="78%" stopColor="#E84855" />
            <stop offset="100%" stopColor="#6E1410" />
          </radialGradient>
          {/* Hot core glow behind the body */}
          <radialGradient id="mgHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFB020" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#FF6B6B" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
          </radialGradient>
          {/* Individual lava cells */}
          <radialGradient id="mgLavaCell" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFF1B8" />
            <stop offset="45%" stopColor="#FFC24D" />
            <stop offset="100%" stopColor="#E84855" stopOpacity="0" />
          </radialGradient>
          <clipPath id="mgClip">
            <circle cx="100" cy="100" r="70" />
          </clipPath>
          <filter id="mgGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="mgSoft" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>

        {/* Pulsing heat halo */}
        <circle className="mg-halo" cx="100" cy="100" r="92" fill="url(#mgHalo)" filter="url(#mgSoft)" />

        {/* Sphere body */}
        <circle cx="100" cy="100" r="70" fill="url(#mgBody)" />

        {/* Flowing lava — clipped to the sphere */}
        <g clipPath="url(#mgClip)">
          <g className="mg-lava">
            <ellipse cx="78" cy="74" rx="26" ry="20" fill="url(#mgLavaCell)" />
            <ellipse cx="128" cy="110" rx="30" ry="24" fill="url(#mgLavaCell)" />
            <ellipse cx="92" cy="138" rx="22" ry="17" fill="url(#mgLavaCell)" />
            <ellipse cx="118" cy="66" rx="16" ry="13" fill="url(#mgLavaCell)" />
            <ellipse cx="62" cy="120" rx="18" ry="15" fill="url(#mgLavaCell)" />
          </g>
          {/* Glowing fissures across the crust */}
          <g className="mg-cracks" filter="url(#mgGlow)" stroke="#FFE08A" fill="none" strokeLinecap="round">
            <path d="M50 96 q22 -10 40 4 t44 -2" strokeWidth="2.4" />
            <path d="M64 132 q18 8 36 -2 t34 6" strokeWidth="1.8" opacity="0.9" />
            <path d="M86 60 q10 18 2 36 t6 38" strokeWidth="1.6" opacity="0.8" />
          </g>
          {/* Cool crust patches drifting on top */}
          <g className="mg-crust" fill="#3A0E0A" opacity="0.5">
            <ellipse cx="70" cy="86" rx="14" ry="9" />
            <ellipse cx="132" cy="92" rx="11" ry="7" />
            <ellipse cx="104" cy="128" rx="13" ry="8" />
          </g>
        </g>

        {/* Top-left specular rim light */}
        <ellipse cx="78" cy="70" rx="26" ry="18" fill="#FFFFFF" opacity="0.28" filter="url(#mgSoft)" />
      </svg>
    </FloatingShape>
  );
}

export default HeroFeatureCard;
