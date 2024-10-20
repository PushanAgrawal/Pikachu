/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        default: 'url("/src/assets/ball3.png") 20 20, default',
       
      },
    },
  },
  plugins: [],
}