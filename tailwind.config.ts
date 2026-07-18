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
        background: "#0a0a14",
        card: "#111120",
        "card-hover": "#1a1a2e",
        accent: {
          purple: "#a78bfa",
          violet: "#8b5cf6",
          blue: "#60a5fa",
          cyan: "#93c5fd",  // заменил зелёный на голубой
        },
        border: "#1e1e35",
        muted: "#b0b0c8",
        dim: "#6b6b85",
      },
      boxShadow: {
        glow: "0 8px 32px rgba(139, 92, 246, 0.3)",
        "glow-sm": "0 4px 16px rgba(139, 92, 246, 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
