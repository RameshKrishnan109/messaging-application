/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "focus-color": "var(--focus-color)",
        "button-hover-color": "var(--button-hover-color)",
        "button-click-color": "var(--button-click-color)"
      },
    },
  },
  plugins: [],
}