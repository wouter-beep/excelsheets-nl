import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: { DEFAULT: "1.25rem", md: "2rem" }, screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        forest: { DEFAULT: "#073B2A", 900: "#04261B", 800: "#073B2A", 700: "#0B4D37" },
        excel: { DEFAULT: "#147D52", 600: "#147D52", 500: "#169062" },
        emerald: { DEFAULT: "#18B979", 400: "#3FCB91", 300: "#7FDDB3" },
        mint: { DEFAULT: "#CBF8E0", 100: "#E6FBEF", 50: "#F2FDF7" },
        paper: { DEFAULT: "#F8FAF7", 200: "#EEF2EC", 300: "#E2E8E0" },
        ink: { DEFAULT: "#14231C", 700: "#2B3B33", 500: "#55665D", 400: "#7A8A81", 300: "#A9B5AE" },
        amber: { DEFAULT: "#F2B84B", 600: "#D99A24", 100: "#FDF1D8" },
        coral: { DEFAULT: "#E2574C", 100: "#FBE3E1" },
        cobalt: { DEFAULT: "#2F6FED", 100: "#E2EBFD" },
        violet: { DEFAULT: "#7A5AF8" },
      },
      fontFamily: {
        display: ['"Manrope Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Inter Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
        mono: ['"JetBrains Mono Variable"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 rgba(20,35,28,0.04), 0 8px 24px -12px rgba(7,59,42,0.18)",
        lift: "0 1px 0 rgba(20,35,28,0.05), 0 24px 48px -24px rgba(7,59,42,0.35)",
        cell: "inset 0 0 0 2px #18B979",
      },
      borderRadius: { xl2: "1.25rem" },
      keyframes: {
        "grid-drift": { "0%": { backgroundPosition: "0 0" }, "100%": { backgroundPosition: "64px 32px" } },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0" } },
        "pulse-cell": { "0%,100%": { boxShadow: "inset 0 0 0 1px rgba(24,185,121,.0)" }, "50%": { boxShadow: "inset 0 0 0 2px rgba(24,185,121,.9)" } },
      },
      animation: {
        "grid-drift": "grid-drift 24s linear infinite",
        blink: "blink 1s step-end infinite",
        "pulse-cell": "pulse-cell 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
