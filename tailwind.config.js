/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,astro}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vintage Paper Light Theme
        'paper': '#f4efe4',
        'paper-light': '#faf8f3',
        'paper-dark': '#e8e0d0',
        'ink': '#2c2416',
        'ink-light': '#4a3f2f',
        'ink-faded': '#6b5d4d',
        'ink-muted': '#8b7355',
        'sepia': '#8b4513',
        'sepia-light': '#a0522d',
        'sepia-dark': '#6b3410',
        'accent': '#7c4a03',
        'accent-light': '#9a6b2f',
        'accent-dark': '#5c3503',
        // Vintage Dark Theme (aged parchment at night)
        'dark-paper': '#1a1612',
        'dark-paper-light': '#252018',
        'dark-paper-elevated': '#2f2820',
        'dark-ink': '#e8dcc8',
        'dark-ink-light': '#d4c4a8',
        'dark-ink-faded': '#a89880',
        'dark-ink-muted': '#7a6b58',
        'dark-sepia': '#c9a86c',
        'dark-accent': '#d4a84b',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        'body': ['Lora', 'Georgia', 'Cambria', 'serif'],
        'mono': ['IBM Plex Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '700' }],
        'heading': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '600' }],
        'subheading': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '500' }],
      },
      boxShadow: {
        'vintage': '0 2px 8px rgba(44, 36, 22, 0.08), 0 1px 2px rgba(44, 36, 22, 0.04)',
        'vintage-hover': '0 8px 24px rgba(44, 36, 22, 0.12), 0 4px 8px rgba(44, 36, 22, 0.08)',
        'vintage-dark': '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        'vintage-dark-hover': '0 8px 24px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)',
        'inset-vintage': 'inset 0 2px 4px rgba(44, 36, 22, 0.06)',
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'typewriter': 'typewriter 2s steps(20) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
