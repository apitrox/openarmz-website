/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        'openarms-blue': '#007CBA',
        'openarms-blue-dark': '#007CBA',
        'openarms-green': '#68B42E',
        'openarms-green-light': '#68B42E',
        'openarms-cyan': '#22D3EE',
        'openarms-sky': '#38BDF8',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'openarms': '16px',
      },
      boxShadow: {
        'openarms': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'openarms-lg': '0 12px 40px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}
