/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f5f7f4',
          100: '#e8efe7',
          300: '#b9cbb8',
          500: '#7f987f',
          700: '#4f6a52'
        },
        wood: {
          100: '#f0e3d6',
          300: '#d4b79a',
          500: '#b78a63',
          700: '#7c5438'
        },
        cream: '#fdfaf6'
      },
      boxShadow: {
        soft: '0 20px 45px -24px rgba(79, 106, 82, 0.45)'
      }
    },
  },
  plugins: [],
};
