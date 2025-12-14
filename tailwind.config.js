/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'gradient': 'gradient 15s ease infinite',
        'gradient-reverse': 'gradient-reverse 15s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'expand-horizontal': 'expand-horizontal 0.5s ease-out forwards',
        'expand-vertical': 'expand-vertical 0.5s ease-out forwards',
        'marquee': 'marquee 25s linear infinite', // Ensure marquee is here too
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shine: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'border-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-reverse': {
          '0%': { backgroundPosition: '100% 50%' },
          '50%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'expand-horizontal': {
          '0%': { width: '0' },
          '100%': { width: '2rem' },
        },
        'expand-vertical': {
          '0%': { height: '0' },
          '100%': { height: '2rem' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        'mapstone-blue': '#224c77',
        'mapstone-dark': '#1a3a5c',
        'nobel-gold': '#cf9f43',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}