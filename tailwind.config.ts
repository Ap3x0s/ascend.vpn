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
        card: "#0c0c16",
        "card-hover": "#14142a",
        accent: {
          purple: "#c4b5fd",
          violet: "#a5b4fc",
          blue: "#93c5fd",
        },
        border: "#1a1a2e",
        muted: "#a8a8c0",
        dim: "#6a6a82",
      },
      boxShadow: {
        glow: "0 8px 32px rgba(139, 92, 246, 0.25)",
        "glow-sm": "0 4px 16px rgba(139, 92, 246, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
