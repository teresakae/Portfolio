import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },

      colors: {
        bg:             "var(--color-bg)",
        surface:        "var(--color-surface)",
        "surface-2":    "var(--color-surface-2)",
        border:         "var(--color-border)",
        "border-hover": "var(--color-border-hover)",
        text: {
          DEFAULT:   "var(--color-text)",
          secondary: "var(--color-text-secondary)",
          tertiary:  "var(--color-text-tertiary)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          subtle:  "var(--color-accent-subtle)",
        },
      },

      fontSize: {
        hero:    ["var(--text-hero)",    { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        display: ["var(--text-display)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        title:   ["var(--text-title)",   { lineHeight: "1.3",  letterSpacing: "-0.015em" }],
        body:    ["var(--text-body)",    { lineHeight: "1.65" }],
        small:   ["var(--text-small)",   { lineHeight: "1.5" }],
        micro:   ["var(--text-micro)",   { lineHeight: "1.4" }],
      },

      borderRadius: {
        card:  "var(--radius-card)",
        badge: "var(--radius-badge)",
        pill:  "var(--radius-pill)",
        input: "var(--radius-input)",
      },

      spacing: {
        "section-x": "var(--space-section-x)",
        "section-y": "var(--space-section-y)",
        "gap-lg":    "var(--space-gap-lg)",
        "gap-md":    "var(--space-gap-md)",
        "gap-sm":    "var(--space-gap-sm)",
      },

      backdropBlur: {
        nav:   "20px",
        modal: "40px",
      },

      transitionTimingFunction: {
        "apple-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
        "apple-in":   "cubic-bezier(0.4, 0, 1, 1)",
        "apple-out":  "cubic-bezier(0, 0, 0.2, 1)",
      },

      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
