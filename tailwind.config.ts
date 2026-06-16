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
        background: "#E0E5EC",
        foreground: "#3D4852",
        muted: "#6B7280",
        accent: {
          DEFAULT: "#6C63FF",
          light: "#8B84FF",
        },
        "accent-secondary": "#38B2AC",
      },
      borderRadius: {
        card: "12px",
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
      colors: {
        "surface-border": "#E6E9EE",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
