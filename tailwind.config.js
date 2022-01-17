module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "blue-light": "#E7F2FF",
      blue: "#D2E7FE",
      orange: "#FDA271",
      "orange-light": "#E7A0A7",
      red: "#E38FA5",
      "purple-reg": "#8D98E7",
      "purple-light": "#CCCDF1",
      "blue-dark": "#273444",
      "purple-dark": "#7B97E9",
      "orange-dark": "#E17F7C",
      grey: "#E2E2E2",
    },
    fontFamily: {
      sans: ["Montserrat ", "sans-serif"],
      bitmap: ["Press Start 2P", "serif"],
    },
    extend: {
      spacing: {
        28: "1.75rem",
        40: "2.5rem",
        60: "3.75rem",
        64: "4rem",
        123: "7.68rem",
        207: "12.93rem",
        244: "15.25rem",
        267: "16.68rem",
      },
    },
  },
  plugins: [],
};
