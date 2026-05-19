/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: '#0B0B0B',
        panel: '#141414',
        text: '#FFFFFF',
        muted: '#A1A1AA',
        soft: '#F5F5F5',
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        grotesk: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        float: 'float 8s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.55' },
        },
      },
    },
  },
  plugins: [],
};
