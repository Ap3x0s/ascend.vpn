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
        background: "#08080f",
        card: "#0f0f1c",
        "card-hover": "#161628",
        accent: {
          purple: "#c084fc",
          violet: "#a855f7",
          blue: "#818cf8",
        },
        border: "#1a1a30",
        muted: "#c4c4d8",
        dim: "#7a7a95",
      },
      boxShadow: {
        glow: "0 8px 32px rgba(168, 85, 247, 0.35)",
        "glow-sm": "0 4px 16px rgba(168, 85, 247, 0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
