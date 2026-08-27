/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        campus: '#0057ff',
        leaf: '#6f3ff5',
        amber: '#ffb000'
      }
    }
  },
  plugins: []
};
