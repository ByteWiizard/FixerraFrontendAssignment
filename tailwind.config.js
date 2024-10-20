/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ] ,
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'], 
      },
      colors: {
        purpleTheme: "hsl(259.63, 39%, 41%)",
        yellowTheme: "hsl(40, 88%, 55%)",
        darkYellowFontColor: "#AA8357",
        grayTheme: "#EFEFED",
      },
    },
  },
  plugins: [],
}

