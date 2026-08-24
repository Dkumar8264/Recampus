/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#17202a',
        campus: '#176b87',
        leaf: '#5b8c5a',
        amber: '#d98b28'
      }
    }
  },
  plugins: []
};
