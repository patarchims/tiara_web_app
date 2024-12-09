/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        primaryColor: '#1977F3',
        secondaryColor: '#5B6589',
        backgroundColor: '#F5F5F5',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
