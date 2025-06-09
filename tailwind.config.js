/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(142, 72%, 95%)',
          100: 'hsl(142, 72%, 90%)',
          200: 'hsl(142, 72%, 80%)',
          300: 'hsl(142, 72%, 70%)',
          400: 'hsl(142, 72%, 60%)',
          500: 'hsl(142, 72%, 50%)',
          600: 'hsl(142, 72%, 40%)',
          700: 'hsl(142, 72%, 29%)',
          800: 'hsl(142, 72%, 20%)',
          900: 'hsl(142, 72%, 10%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};