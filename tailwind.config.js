/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep cinematic background palette
        ink: {
          900: '#0A0E14',
          850: '#0D1117',
          800: '#111827',
          700: '#1C2431',
          600: '#232E3F',
        },
        // Accents — used sparingly
        emerald: {
          DEFAULT: '#2E8B57',
          soft: '#3FA776',
          deep: '#1F6B42',
        },
        cyan: {
          DEFAULT: '#5BC0BE',
          soft: '#7FD4D2',
          deep: '#3F9C9A',
        },
        silver: {
          DEFAULT: '#D9E2EC',
          soft: '#EEF2F7',
          dim: '#8FA0B3',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Cabinet Grotesk"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"General Sans"', 'Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        hud: '0.22em',
        cinema: '0.08em',
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(91, 192, 190, 0.35)',
        emerald: '0 0 50px -12px rgba(46, 139, 87, 0.45)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      backdropBlur: { xs: '2px' },
      animation: {
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
        'spin-slow': 'spin 28s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'scan': 'scan 6s linear infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%,100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
};
