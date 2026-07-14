/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "#9A0B0D",
          dark: "#6E0709",
          50: "#FBEAEA",
        },
        gold: {
          DEFAULT: "#C89116",
          dark: "#9C7110",
        },
        forest: {
          DEFAULT: "#0B6E4F",
        },
        ink: {
          DEFAULT: "#1C1917",
          soft: "#4A4440",
        },
        paper: {
          DEFAULT: "#FBF9F6",
          raised: "#FFFFFF",
        },
        line: "#E7E1D8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        card: "1.25rem",
      },
    },
  },
  plugins: [],
};
