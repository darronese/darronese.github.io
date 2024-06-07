/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-beige': '#9c8481',
        'light-beige': '#e2cbb0',
      }
    },
  },
  plugins: [],
}
