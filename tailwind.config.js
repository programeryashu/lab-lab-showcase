/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F19', // Deep navy / charcoal
        surface: '#111827',
        primary: '#3B82F6', // Blue
        secondary: '#8B5CF6', // Purple
        text: '#F3F4F6', // Soft white
        muted: '#9CA3AF', // Gray
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
