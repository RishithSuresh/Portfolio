/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#06090f',
          850: '#090e17',
          800: '#0f1825',
          700: '#182030',
          600: '#1f2a3d',
        },
        emerald: {
          DEFAULT: '#00c97a',
          soft: '#2edfa0',
          deep: '#009960',
        },
        cyan: {
          DEFAULT: '#38eff5',
          soft: '#7ff4f7',
          deep: '#1cc8cf',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          soft: '#a78bfa',
          deep: '#6d28d9',
        },
        rose: {
          DEFAULT: '#f43f5e',
          soft: '#fb7185',
        },
        amber: {
          DEFAULT: '#f59e0b',
        },
        silver: {
          DEFAULT: '#d9e2ec',
          soft: '#eef2f7',
          dim: '#8fa0b3',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '"Cabinet Grotesk"', '"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['"General Sans"', 'Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        hud:    '0.22em',
        cinema: '0.08em',
      },
      boxShadow: {
        glow:        '0 0 40px -10px rgba(56, 239, 245, 0.45)',
        'glow-green':'0 0 50px -12px rgba(0, 201, 122, 0.50)',
        'glow-violet':'0 0 50px -12px rgba(139, 92, 246, 0.45)',
        inset:       'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'pulse-soft':    'pulseSoft 4s ease-in-out infinite',
        'spin-slow':     'spin 28s linear infinite',
        'float':         'float 8s ease-in-out infinite',
        'float-slow':    'float 14s ease-in-out infinite',
        'scan':          'scan 6s linear infinite',
        'aurora-float':  'auroraFloat 12s ease-in-out infinite',
        'shimmer':       'shimmerSweep 3.5s ease-in-out infinite',
        'border-glow':   'borderGlow 3s ease-in-out infinite',
        'text-flicker':  'textFlicker 8s linear infinite',
        'gradient-shift':'gradientShift 6s ease infinite',
        'orbit':         'orbit 20s linear infinite',
      },
      keyframes: {
        pulseSoft: {
          '0%,100%': { opacity: '0.55' },
          '50%':     { opacity: '1' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        auroraFloat: {
          '0%,100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%':     { transform: 'translate(30px, -20px) scale(1.06)' },
          '66%':     { transform: 'translate(-20px, 15px) scale(0.97)' },
        },
        shimmerSweep: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
        borderGlow: {
          '0%,100%': { borderColor: 'rgba(56,239,245,0.15)' },
          '50%':     { borderColor: 'rgba(56,239,245,0.42)', boxShadow: '0 0 24px rgba(56,239,245,0.20)' },
        },
        textFlicker: {
          '0%,100%': { opacity: '1' },
          '92%': { opacity: '1' },
          '93%': { opacity: '0.7' },
          '94%': { opacity: '1' },
          '96%': { opacity: '0.85' },
          '97%': { opacity: '1' },
        },
        gradientShift: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' },
        },
      },
    },
  },
  plugins: [],
};
