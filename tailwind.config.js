/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#1a56db',
          dark: '#1240a8',
        },
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};
