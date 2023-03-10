const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        DEFAULT: "#000",
        primary: "#222222",
        1: "#111",
        2: "#1115",
      },
      white: {
        DEFAULT: "#fff",
        primary: "#eceff1",
      },
      red: {
        light: "#faa2b0",
        DEFAULT: "#f00",
        primary: "#ff0266",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
