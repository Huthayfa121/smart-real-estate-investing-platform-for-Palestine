/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FAF8F3',
          100: '#F5EFE7',
          200: '#E8DCC4',
          300: '#D4C2A0',
          400: '#C4A962',
          500: '#8B6F47',
          600: '#8B6F47',
          700: '#5C4A35',
          800: '#4A3D2C',
          900: '#3A2F22',
        },
        cream: '#F5EFE7',
        beige: '#E8DCC4',
        brown: '#8B6F47',
        gold: '#C4A962',
        'dark-brown': '#5C4A35',
        'light-cream': '#FAF8F3',
      },
      fontFamily: {
        arabic: ['Lato', 'Cairo', 'Tajawal', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
