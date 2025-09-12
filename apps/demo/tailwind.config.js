/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '40px',
        '3xl': '64px',
        'apple': '20px',
        'strong': '28px',
      },
      backdropSaturate: {
        180: '1.8',
        200: '2',
      },
      backdropBrightness: {
        25: '.25',
        110: '1.1',
        125: '1.25',
        175: '1.75',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'glass-lg': '0 12px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        'glass-xl': '0 16px 64px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
      },
      animation: {
        'glass-float': 'glassFloat 6s ease-in-out infinite',
        'glass-pulse': 'glassPulse 3s ease-in-out infinite',
      },
      keyframes: {
        glassFloat: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.02)' },
        },
        glassPulse: {
          '0%, 100%': { 
            backdropFilter: 'blur(20px) saturate(180%)',
            background: 'rgba(255, 255, 255, 0.25)' 
          },
          '50%': { 
            backdropFilter: 'blur(24px) saturate(200%)',
            background: 'rgba(255, 255, 255, 0.35)' 
          },
        },
      },
    },
  },
  plugins: [],
}