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
        navy:  '#0D1117',
        teal:  { DEFAULT: '#0A84FF', light: '#E0F0FF' },
        gold:  { DEFAULT: '#2563EB', light: '#EFF6FF' },
        brand: { gray: '#F3F4F6' },
      },
    },
  },
}
