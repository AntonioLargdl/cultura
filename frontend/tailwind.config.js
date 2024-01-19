/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        t2xl: '0px 0px 50px -20px rgb(0 0 0 / 0.25);'
      },
    },
    variants: {
      extend: {
        backgroundColor: ['dark'],
        textColor: ['dark'],
      },
    },
  },
  plugins: [],
}