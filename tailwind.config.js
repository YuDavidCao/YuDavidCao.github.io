/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#fafcfe',
        'secondary': '#f0f2f5',
        'tertiary': '#e0e2e5',
        'tx-primary': '#1e293b',
        'tx-secondary': '#475569',
        'tx-tertiary': '#64748b',
        'dark-primary': '#18181b',
        'dark-secondary': '#1f181b',
        'dark-tertiary': '#3f3f46',
        'dark-tx-primary': '#f4f4f5',
        'dark-tx-secondary': '#a1a1aa',
        'dark-tx-tertiary': '#71717a',
        "dark-bg": "#222426",
        "dark-bg-tx-primary": "#afa99e",
        "dark-bg-hover": "#333739",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}