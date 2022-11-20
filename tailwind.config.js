/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#b595a4',
          DEFAULT: '#856775',
        },
        secondary: {
          DEFAULT: '#87967a',
        },
        black: '#576371',
        backgroundColor: '#e6eef2',
        white: '#f5f5f5',
      },
    },
  },
  plugins: [],
}
