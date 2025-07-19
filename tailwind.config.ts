import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#10b981", // emerald-500
          50: "#ecfdf5",
          100: "#d1fae5", 
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        secondary: {
          DEFAULT: "#059669", // emerald-600
          light: "#34d399",
          dark: "#047857",
        },
        dark: {
          DEFAULT: "#1f2937", // gray-800
          light: "#374151",   // gray-700
          lighter: "#4b5563", // gray-600
        },
        grayish: {
          DEFAULT: "#6b7280", // gray-500
          light: "#9ca3af",   // gray-400
          lighter: "#d1d5db", // gray-300
          lightest: "#e5e7eb", // gray-200
        },
        light: {
          DEFAULT: "#f8fafc", // slate-50
          gray: "#f1f5f9",    // slate-100
          darker: "#e2e8f0",  // slate-200
        },
        accent: {
          success: "#34d399",
          warning: "#fbbf24",
          error: "#ef4444",
        }
      },
      fontFamily: {
        heading: ["'Outfit'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        logo: ["'Saira Stencil One'", "cursive"],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'step-slide-in': 'step-slide-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'step-slide-out': 'step-slide-out 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animationDelay: {
        '100': '100ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'step-slide-in': {
          '0%': { opacity: '0', transform: 'translateY(50px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'step-slide-out': {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(-50px)' },
        },
      },
      scale: {
        '102': '1.02',
      },
      transitionTimingFunction: {
        'cubic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      width: {
        '15': '3.75rem',
        '25': '6.25rem',
      },
    },
  },
  plugins: [],
};

export default config;
