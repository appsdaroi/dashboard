/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
   theme: {
    extend: {

      container: {
        center: true,
        padding: '1rem',
        screens: {
          lg: '1125px',
          xl: '1125px',
          '2xl': '1125px',
        },
      },

      colors: {
        primary: colors.indigo,
      }
    },
  },
  plugins: [],
}
