const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./src/**/*.{js,ts,jsx,tsx}`, '../../packages/ui/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.green,
        secondary: colors.lime,
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.35,
          },
        },
      },
      animation: {
        blink: 'blink 1.4s linear infinite',
      },
    },
  },
  plugins: [],
};
