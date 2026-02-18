/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': [
          '"Space Grotesk"', 
          'ui-sans-serif', 
          'system-ui', 
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"Segoe UI"', 
          'Roboto', 
          '"Helvetica Neue"', 
          'Arial', 
          'sans-serif'
        ],
      },
      colors: {
        // Custom color tokens
        estelar: '#0D0D0D',
        'neon-green': '#00FFB2',
        'cosmic-purple': '#6A0DAD', 
        'cyan-blue': '#3FE0F5',
        'galactic-gray': '#A1A1AA',
        'nebular-white': '#F5F5F5',
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #6A0DAD 0%, #3FE0F5 100%)',
        'glass-overlay': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'hero-overlay': 'linear-gradient(135deg, rgba(13,13,13,0.7) 0%, rgba(106,13,173,0.3) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};