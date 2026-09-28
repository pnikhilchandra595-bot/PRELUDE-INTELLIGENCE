/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060813',
          900: '#0a0d1d',
          850: '#0f1429',
          800: '#141b36',
          700: '#1e294b',
        },
        brand: {
          teal: '#06b6d4',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
          purple: '#a855f7',
          amber: '#f59e0b',
          rose: '#f43f5e',
        },
        glass: {
          card: 'rgba(255, 255, 255, 0.06)',
          panel: 'rgba(10, 13, 29, 0.72)',
          pill: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
          border: 'rgba(255, 255, 255, 0.12)',
          'border-strong': 'rgba(255, 255, 255, 0.22)',
          scrim: 'rgba(6, 8, 19, 0.85)',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Sora', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.36), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        'glass-panel': '0 16px 48px 0 rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'glass-pill': '0 2px 8px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
        'glow-teal': '0 0 25px -4px rgba(6, 182, 212, 0.35)',
        'glow-violet': '0 0 25px -4px rgba(139, 92, 246, 0.35)',
        'glow-amber': '0 0 25px -4px rgba(245, 158, 11, 0.3)',
        'specular': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.3)',
      },
      animation: {
        'blob-drift-1': 'blobDrift1 36s ease-in-out infinite',
        'blob-drift-2': 'blobDrift2 48s ease-in-out infinite',
        'blob-drift-3': 'blobDrift3 42s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'specular-sweep': 'specularSweep 3s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        blobDrift1: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(120px, 80px) scale(1.15)' },
          '66%': { transform: 'translate(-80px, 140px) scale(0.92)' },
        },
        blobDrift2: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(-140px, -60px) scale(0.95)' },
          '66%': { transform: 'translate(90px, -110px) scale(1.12)' },
        },
        blobDrift3: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(70px, -90px) scale(1.1)' },
          '66%': { transform: 'translate(-100px, 60px) scale(0.9)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}
