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
        ink: '#0b1c3f', // deep navy (no black)
        paper: '#f6faff', // cool blue-white
        navy: '#06245f',
        primary: {
          DEFAULT: '#0066cc',
          dark: '#0052a3',
        },
      },
      maxWidth: { content: '1240px' },
      letterSpacing: { tightest: '-0.04em' },
    },
  },
  plugins: [],
};
