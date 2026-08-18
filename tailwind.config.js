/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        green: {
          deep: "#2D5016",
          light: "#8BAF5A",
        },
        gold: "#C9A84C",
        red: { deep: "#8B1A1A" },
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
