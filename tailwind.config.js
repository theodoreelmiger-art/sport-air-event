/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Hanken Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Schibsted Grotesk', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        ink: '#0b0d12',
        paper: '#faf9f6',
        primary: {
          DEFAULT: '#0066cc',
          dark: '#0052a3',
        },
      },
      maxWidth: {
        content: '1240px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};
