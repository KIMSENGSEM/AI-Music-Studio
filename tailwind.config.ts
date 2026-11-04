import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        foreground: "#f3f4f6",
        studio: {
          950: "#06070a",
          900: "#0b0d14",
          850: "#10131d",
          800: "#161b29",
          700: "#222a3f",
          600: "#333f5d",
          accent: "#8b5cf6",
          purple: "#9333ea",
          blue: "#3b82f6",
          cyan: "#06b6d4",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e"
        },
        border: "#1f2638",
        card: "#0e111a",
        cardForeground: "#e2e8f0"
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"]
      }
    },
  },
  plugins: [],
};

export default config;
