/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        royal: '#2D3FE7',
        crimson: '#FF2D55',
        midnight: '#0A0A0B',
      },
      letterSpacing: {
        tighterest: '-0.05em',
      }
    },
  },
  plugins: [],
}
