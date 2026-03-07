/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        nature: {
          emerald: '#10B981',
          lime: '#84CC16',
          forest: '#064E3B',
          soft: '#F0F9FF',
        }
      }
    },
  },
  plugins: [],
}
