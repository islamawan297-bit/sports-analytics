import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e',
          accent: '#06b6d4',
          neon: '#10b981',
          gold: '#f59e0b',
        },
        navy: {
          950: '#090d16',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px -3px rgba(6, 182, 212, 0.3)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.4)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.4)',
      }
    },
  },
  plugins: [],
};
export default config;
