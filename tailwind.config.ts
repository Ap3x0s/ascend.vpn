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
        background: "#0a1628",
        card: "#0f2035",
        "card-hover": "#162d4a",
        "accent-purple": "#0ea5e9",
        "accent-cyan": "#06b6d4",
        "accent-teal": "#14b8a6",
        border: "#1e3a5f",
      },
    },
  },
  plugins: [],
};
export default config;
