import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pinkBrand: "#FF66A3",
        pinkSoft: "#FFC1D9",
        pinkLight: "#FFC1D9",
        pinkDark: "#E94F91",
        pinkAccent: "#FF9EC7",
        ink: "#37243B",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        pinkGradient: "linear-gradient(135deg, #FFF5FA, #FFE3F0)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'display': ['var(--font-poppins)', 'sans-serif'],
        'handwritten': ['var(--font-dancing-script)', 'cursive'],
        'body': ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'pulse-soft': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-soft': 'bounce 1s infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        sparkle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      },
      backdropBlur: {
        'xs': '2px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      minHeight: {
        'dvh': '100dvh',
      },
      height: {
        'dvh': '100dvh',
      }
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/forms'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/aspect-ratio'),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function({ addUtilities }: any) {
      addUtilities({
        '.pt-safe': {
          paddingTop: 'calc(1rem + env(safe-area-inset-top))',
        },
        '.pb-safe': {
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
        },
        '.pl-safe': {
          paddingLeft: 'calc(1rem + env(safe-area-inset-left))',
        },
        '.pr-safe': {
          paddingRight: 'calc(1rem + env(safe-area-inset-right))',
        },
      });
    },
  ],
};

export default config;