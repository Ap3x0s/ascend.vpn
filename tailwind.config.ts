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
        background: "#0a0a0f",
        card: "#1a1a2e",
        "card-hover": "#25253e",
        "accent-purple": "#6c5ce7",
        "accent-cyan": "#00cec9",
        border: "#2a2a3e",
      },
    },
  },
  plugins: [],
};
export default config;