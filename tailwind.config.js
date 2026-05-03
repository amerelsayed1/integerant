export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        arabic: ['Cairo', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      },
      colors: {
        navy:  '#0D1B3D',
        teal:  { DEFAULT: '#0FA4A6', light: '#E0F5F5' },
        gold:  { DEFAULT: '#C5A15A', light: '#FBF3E4' },
        brand: { gray: '#E6E9ED' },
      },
    },
  },
}
