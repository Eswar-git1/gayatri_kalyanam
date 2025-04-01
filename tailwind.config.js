/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'serif'],
        telugu: ['Noto Sans Telugu', 'sans-serif'],
      },
      colors: {
        'pastel-pink': '#FFD1DC',
        'pastel-peach': '#FFDAB9',
        'pastel-gold': '#EED6AF',
        'pastel-green': '#98FF98',
        'pastel-rose': '#FFB7C5',
        'deep-rose': '#C48793',
      },
    },
  },
  plugins: [],
};