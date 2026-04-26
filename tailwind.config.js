/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        ink: '#0b0d12',
        slate1: '#11141b',
        slate2: '#171c26',
        accent: '#f59e0b',
        good: '#22c55e',
        warn: '#ef4444',
      },
    },
  },
  plugins: [],
};
