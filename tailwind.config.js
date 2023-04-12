const { clamp } = require("framer-motion")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      base: "clamp(14px, 1.25vw, 16px)",
      large: "clamp(14px, 1.5vw, 18px)",
      xl: "clamp(14px, 1.5vw, 20px)",
      heading: "clamp(24px, 2.8vw, 36px)",
      headingLarge: "clamp(32px, 3.75vw, 48px)",
    },
    extend: {
      gridTemplateColumns: {
        list: "repeat(auto-fit, minmax(300px, 1fr))",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        openSans: ["var(--font-open-sans)"],
      },
    },
  },
  plugins: [],
}
