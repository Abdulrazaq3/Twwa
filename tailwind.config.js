/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'taww-primary': '#32c28d',
        'taww-secondary': '#00a86b',
        'taww-accent': '#a8ff78',
      }
    }
  },
  plugins: [],
}
