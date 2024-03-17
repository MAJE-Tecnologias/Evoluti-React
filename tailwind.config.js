/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        evolutiDarkBlue: "#132941",
        evolutiLightGreen: "#45D496",
        evolutiGolden: "#D7D588",
        evolutiGoldenDarker: "#c7bf58",
        evolutiGoldenSuperDarker: "#72562e",
        evolutiGoldenLighter: "#e1e1a6",
        evolutiGoldenSuperLight: "#f1f1d4",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};