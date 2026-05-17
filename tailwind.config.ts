import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './content/**/*.{md,mdx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        base: 'rgb(var(--bg-base) / <alpha-value>)',
        elevated: 'rgb(var(--bg-elevated) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          foreground: 'rgb(var(--accent-foreground) / <alpha-value>)',
        },
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'cursor-blink': {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%, ': { transform: 'translateY(-6px)' },
        },
        'float-1': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(40px,-30px,0)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(-30px,40px,0)' },
        },
      },
      animation: {
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'bob': 'bob 3.2s ease-in-out infinite',
        'float-1': 'float-1 22s ease-in-out infinite',
        'float-2': 'float-2 28s ease-in-out infinite',
      },
      typography: ({ theme }: { theme: (path: string) => string }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.muted-foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            '--tw-prose-lead': theme('colors.muted-foreground'),
            '--tw-prose-links': theme('colors.accent.DEFAULT'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-counters': theme('colors.muted-foreground'),
            '--tw-prose-bullets': theme('colors.accent.DEFAULT'),
            '--tw-prose-hr': theme('colors.border'),
            '--tw-prose-quotes': theme('colors.foreground'),
            '--tw-prose-quote-borders': theme('colors.accent.DEFAULT'),
            '--tw-prose-code': theme('colors.accent.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.foreground'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 0.35)',
            maxWidth: '70ch',
            a: { textUnderlineOffset: '3px' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              padding: '0.15rem 0.35rem',
              borderRadius: '0.35rem',
              backgroundColor: 'rgb(255 255 255 / 0.06)',
              fontWeight: '500',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}

export default config
