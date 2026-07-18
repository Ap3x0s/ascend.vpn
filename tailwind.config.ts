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
        background: "#0a0a12",
        card: "#12121e",
        "card-hover": "#1a1a2a",
        accent: {
          purple: "#a78bfa",
          violet: "#c4b5fd",
          cyan: "#22d3ee",
          blue: "#60a5fa",
        },
        border: "#1e1e30",
        muted: "#a1a1b5",
        dim: "#6b6b80",
      },
      boxShadow: {
        glow: "0 8px 32px rgba(167, 139, 250, 0.25)",
        "glow-cyan": "0 8px 32px rgba(34, 211, 238, 0.2)",
        card: "0 4px 24px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
