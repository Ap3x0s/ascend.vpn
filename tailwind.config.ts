import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090d",
        card: "rgba(255, 255, 255, 0.06)",
        "card-hover": "rgba(255, 255, 255, 0.10)",
        "card-border": "rgba(255, 255, 255, 0.13)",
        accent: {
          purple: "#a5b4fc",
          violet: "#c4b5fd",
          cyan: "#7dd3fc",
        },
        border: "rgba(255, 255, 255, 0.13)",
        muted: "#a1a1aa",
        dim: "#71717a",
      },
      borderRadius: {
        xl: "14px",
      },
      boxShadow: {
        glass: "0 20px 50px rgba(0, 0, 0, 0.45)",
        glow: "0 12px 40px rgba(139, 155, 255, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
