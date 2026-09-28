/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#1A0E0A',
          espresso: '#24150F',
          cocoa: '#2E1B12',
          roast: '#3A2115',
          cream: '#F4E7CF',
          ivory: '#FFF8EA',
          paper: '#FAF3E8',
          gold: '#C79A4A',
          goldLight: '#D8B36A',
          goldBright: '#E5C378',
          botanical: '#263B19',
          botanicalDark: '#1A2911',
          greenAccent: '#33451B',
          leaf: '#4A5A20',
          spice: '#E84B16',
          chili: '#D13808',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        script: ['"Caveat"', '"Covered By Your Grace"', 'cursive'],
        handwritten: ['"Caveat"', '"Covered By Your Grace"', 'cursive'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(199, 154, 74, 0.25)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C79A4A 0%, #E5C378 50%, #D8B36A 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1A0E0A 0%, #24150F 50%, #2E1B12 100%)',
        'cream-gradient': 'linear-gradient(180deg, #FFF8EA 0%, #F4E7CF 100%)',
      }
    },
  },
  plugins: [],
}
