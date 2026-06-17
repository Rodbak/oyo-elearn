import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#1E293B",
        muted: "#272727",
        accent: {
          DEFAULT: "#6C63FF",
          light: "#8B84FF",
        },
        "accent-secondary": "#38B2AC",
        "surface-border": "#a0a0a0",
        // Warm highlight accent used for primary CTAs, search/notification dots,
        // and the energetic hero/illustration moments — complements the existing
        // purple `accent` without replacing it everywhere.
        sunset: {
          DEFAULT: "#FF6B6B",
          light: "#FFA1A1",
          dark: "#E84855",
        },
        // Colorful icon-badge palette for stat cards, category chips, etc.
        // (the multi-hue circular icons seen across stat/category sections).
        badge: {
          coral: "#FF6B6B",
          amber: "#FFB020",
          violet: "#8B5CF6",
          sky: "#3B82F6",
          mint: "#38B2AC",
        },
      },
      borderRadius: {
        card: "15px",
        btn: "8px",
        inner: "8px",
      },
      boxShadow: {
        "neu-extruded": "0 4px 10px rgba(16,24,40,0.06)",
        "neu-extruded-hover": "0 6px 14px rgba(16,24,40,0.08)",
        "neu-extruded-sm": "0 2px 6px rgba(16,24,40,0.04)",
        "neu-inset": "inset 1px 1px 2px rgba(0,0,0,0.03)",
        "neu-inset-deep": "inset 2px 2px 4px rgba(0,0,0,0.04)",
        "neu-inset-sm": "inset 1px 1px 2px rgba(0,0,0,0.02)",
        elev: "0 8px 30px rgba(16,24,40,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-delayed": "float-delayed 5.5s ease-in-out infinite",
        blob: "blob 11s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(10px)" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(12px,-18px) scale(1.05)" },
          "66%": { transform: "translate(-10px,10px) scale(0.97)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
