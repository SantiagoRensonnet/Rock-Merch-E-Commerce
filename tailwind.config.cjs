/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jost: "'Jost',sans-serif",
        openSans: "'Open Sans Condensed', sans-serif",
      },
    },
  },
  plugins: [],
};
