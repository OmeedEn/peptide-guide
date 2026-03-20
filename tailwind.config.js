/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#050810',
          900: '#0a0e1a',
          800: '#0f1629',
          700: '#161d38',
          600: '#1e2748',
        },
        neon: {
          teal: '#00d4aa',
          cyan: '#0ea5e9',
          blue: '#6366f1',
        },
        risk: {
          low: '#10b981',
          'low-mod': '#3b82f6',
          moderate: '#f59e0b',
          high: '#f43f5e',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glow-teal': 'radial-gradient(ellipse at center, rgba(0,212,170,0.15) 0%, transparent 70%)',
        'glow-cyan': 'radial-gradient(ellipse at center, rgba(14,165,233,0.1) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
