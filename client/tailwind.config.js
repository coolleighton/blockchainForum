/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "300px",
      sm: "640px",
      md: "768px",
      lg: "1030px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1700px",
    },
  },
};
