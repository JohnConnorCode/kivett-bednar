import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'

export default {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './sanity/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Kivett Bednar brand colors - Blues/Americana theme
        midnight: {
          50: '#e8edf5',
          100: '#d1dbe9',
          200: '#a3b7d4',
          300: '#7593be',
          400: '#476fa9',
          500: '#1a4b93', // Primary midnight blue
          600: '#153c76',
          700: '#102d58',
          800: '#0b1e3b',
          900: '#060f1d',
          950: '#03070e',
        },
        charcoal: {
          50: '#f6f6f7',
          100: '#edeeef',
          200: '#dcdcdf',
          300: '#cacbcf',
          400: '#b9b9bf',
          500: '#a7a8af',
          600: '#86878c',
          700: '#646569',
          800: '#434446',
          900: '#212223', // Primary charcoal
          950: '#101111',
        },
        bone: '#f8f6f1', // Bone white
        // Vintage Blues color palette
        vintage: {
          50: '#fef5f1',
          100: '#fde8df',
          200: '#fbd1bf',
          300: '#f9b49f',
          400: '#f79780',
          500: '#fb875e', // Primary burnt orange - vintage blues accent
          600: '#f56b3e',
          700: '#e44d1d',
          800: '#b73b16',
          900: '#8a2c11',
          950: '#5d1d0b',
        },
        gold: {
          50: '#fefbf0',
          100: '#fdf6db',
          200: '#fbedb7',
          300: '#f9e493',
          400: '#f7db6f',
          500: '#F0C419', // Warm gold accent
          600: '#d4a917',
          700: '#a68313',
          800: '#78600e',
          900: '#4a3b09',
          950: '#312706',
        },
        cream: '#f5e6d3', // Aged paper warm background
        amber: {
          50: '#fefbf3',
          100: '#fdf7e7',
          200: '#fbefc',
          300: '#f8e7c3',
          400: '#f6df9b',
          500: '#f4d773',
          600: '#f0c83e', // Stage light amber accent
          700: '#d4a919',
          800: '#9f7d13',
          900: '#6a520d',
          950: '#352907',
        },
        black: '#0d0e12',
        white: '#fff',
        cyan: {
          50: '#e7fefe',
          100: '#c5fcfc',
          200: '#96f8f8',
          300: '#62efef',
          400: '#18e2e2',
          500: '#04b8be',
          600: '#037782',
          700: '#024950',
          800: '#042f34',
          900: '#072227',
          950: '#0d181c',
        },
        gray: {
          50: '#f6f6f8',
          100: '#eeeef1',
          200: '#e3e4e8',
          300: '#bbbdc9',
          400: '#9499ad',
          500: '#727892',
          600: '#515870',
          700: '#383d51',
          800: '#252837',
          900: '#1b1d27',
          950: '#13141b',
        },
        red: {
          50: '#fff6f5',
          100: '#ffe7e5',
          200: '#ffdedc',
          300: '#fdada5',
          400: '#f77769',
          500: '#ef4434',
          600: '#cc2819',
          700: '#8b2018',
          800: '#4d1714',
          900: '#321615',
          950: '#1e1011',
        },
        orange: {
          50: '#fcf1e8',
          100: '#f9e3d2',
          200: '#f4c7a6',
          300: '#efab7a',
          400: '#ea8f4e',
          500: '#e57322',
          600: '#ba5f1e',
          700: '#8f4b1b',
          800: '#653818',
          900: '#3a2415',
          950: '#251a13',
        },
        yellow: {
          50: '#fefae1',
          100: '#fcf3bb',
          200: '#f9e994',
          300: '#f7d455',
          400: '#f9bc15',
          500: '#d28a04',
          600: '#965908',
          700: '#653a0b',
          800: '#3b220c',
          900: '#271a11',
          950: '#181410',
        },
        green: {
          50: '#e7f9ed',
          100: '#d0f4dc',
          200: '#a1eaba',
          300: '#72e097',
          400: '#43d675',
          500: '#3ab564',
          600: '#329454',
          700: '#297343',
          800: '#215233',
          900: '#183122',
          950: '#14211a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-display)', 'serif'],
        heading: ['var(--font-oswald)', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography, animate],
} satisfies Config
