/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'codBlack': '#121212',
        'lightPurp': '#A5A3FE',
        'mediumPurp': '#8C7FFA',
        'whitePurp': '#DFE1FF',
        'darkPurp': '#4C2EA5',
      },
    },
  },
  plugins: [],
}

