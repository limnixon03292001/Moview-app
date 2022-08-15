/** @type {import('tailwindcss').Config} */
 
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          fontNunito: ['Nunito']
      },
      gridTemplateColumns: {
        'myGrid': ' auto 270px',
        'myGridFluid': 'repeat(auto-fit,minmax(100px,1fr))',
        'myGridFluidlg': 'repeat(auto-fit,minmax(120px,1fr))',
      }
    },
  },
  plugins: [],
}