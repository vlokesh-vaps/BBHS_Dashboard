import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bbhs: {
          navy: {
            950: "#061325",
            900: "#0B192C",
            800: "#0F2646",
            700: "#1E3E62",
            600: "#2B5482",
            100: "#E2E8F0",
            50: "#F1F5F9",
          },
          gold: {
            600: "#B45309",
            500: "#D97706",
            400: "#F59E0B",
            300: "#FCD34D",
            100: "#FEF3C7",
          },
          maroon: {
            700: "#991B1B",
            600: "#B91C1C",
            100: "#FEE2E2",
          },
          house: {
            baldwin: "#2563EB",   // Royal Blue
            western: "#DC2626",   // Crimson Red
            anderson: "#16A34A",  // Emerald Green
            richards: "#EAB308",  // Gold Yellow
          }
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
