/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        loginButtonsBackground: "#EFF8FF",
        evolutiDarkBlueText: "#1A334E",
        evolutiLightBlueText: "#5c9dd4",
        evolutiBlueText: "#4984c7",
        evolutiDarkBlue: "#132941",
        EvolutiLightGreenSuperLighter: "#d2f9e2",
        EvolutiLightGreenLighter: "#70e5af",
        evolutiLightGreen: "#45D496",
        evolutiGreen: "#13b675",
        evolutiGreenDarker: "#07945e",
        evolutiGolden: "#D7D588",
        evolutiGoldenDarker: "#c7bf58",
        evolutiGoldenSuperDarker: "#72562e",
        evolutiGoldenLighter: "#e1e1a6",
        evolutiGoldenSuperLight: "#f1f1d4",
        evolutiGrayText:"#5C5B5B",

        // Cor dos Blocos

        evolutiBlockLight: "#DEDFA4",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xss: "320px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1024px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],

  darkMode: "class",
};
