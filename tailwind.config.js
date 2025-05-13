module.exports = {
  // mode: "jit",
  important: true,
  purge: ["./**/*.html", "./**/*.php", "./**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        swipe: "swipe 2s ease-out infinite",
      },
      keyframes: {
        swipe: {
          "0%, 100%": {
            transform: "translate3d(calc(-50% - 1rem),-50%,0)",
          },
          "50%": {
            transform: "translate3d(calc(-50% + 1rem),-50%,0)",
          },
        },
      },
      borderWidth: {
        6: "6px",
      },
      spacing: {
        e84: "84px",
        e580: "580px",
        e800: "800px",
        "40/100": "40%",
        "48/100": "48%",
        "140/100": "140%",
      },
      fontFamily: {
        sans: ["Noto Sans JP", "sans-serif"],
        serif: ["Noto Serif JP", "sans-serif"],
      },
      fontSize: {
        tiny: ".625rem",
      },
      colors: {
        "very-light-blue": "#e4ecf8",
        "deep-sea-blue": {
          DEFAULT: "#06538d",
          dark: "#053e6a",
        },
        "deep-sea-blue-2": "#07558e",
        "dark-grey-blue": {
          DEFAULT: "#293a52",
          dark: "#121A25",
        },
        wheat: "#ffde80",
        "dark-red": {
          DEFAULT: "#800000",
          dark: "#600000",
        },
        black: "#000000",
        "greyish-brown": "#444444",
        "brownish-grey": "#777777",
        "brown-grey": "#aaaaaa",
        "gray-d": "#dddddd",
        "very-light-pink": "#eeeeee",
        white: "#ffffff",
      },
    },
  },
  variants: {
    extend: {
      fontSize: ["rfs"],
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-rfs"),
  ],
};
