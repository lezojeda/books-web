/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#b595a4',
          DEFAULT: '#765B5F',
        },
        secondary: {
          DEFAULT: '#87967a',
        },
        backgroundColor: '#e6eef2',
        black: '#576371',
        white: '#f5f5f5',
      },
    },
  },
  plugins: [],
}
