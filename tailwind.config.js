/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./script.js"
  ],
  theme: {
    extend: {
      colors: {
        'openarms-blue': '#0EA5E9',
        'openarms-blue-dark': '#0284C7',
        'openarms-green': '#36D399',
        'openarms-green-light': '#86EFAC',
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
