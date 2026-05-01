import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#F7F5F3",
          light: "#FAF8F6",
          dark: "#EDE9E5",
        },
        pink: {
          DEFAULT: "#E89CA9",
          light: "#f0b3bd",
          dark: "#dc7f8f",
        },
        text: {
          dark: "#2d2d2d",
          light: "#6b6b6b",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
