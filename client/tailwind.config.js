/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Libre Baskerville"', 'Georgia', '"Times New Roman"', 'serif'],
        display: ['"Libre Baskerville"', 'Georgia', '"Times New Roman"', 'serif']
      },
      colors: {
        ink: '#050505',
        campus: '#0099ff',
        leaf: '#ff00aa',
        amber: '#ff6b00'
      }
    }
  },
  plugins: []
};
