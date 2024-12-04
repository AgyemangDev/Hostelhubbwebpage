/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#610b0c",
        accent: "#b81c3c",
      },
      animation: {
        bounce200: "bounce 1s infinite 200ms",
        pulse400: "pulse 2s ease-in-out infinite",
        slideRight: "slide-right 0.5s ease-in-out forwards",
      },
      keyframes: {
        "slide-right": {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
