import type { Config } from 'tailwindcss'

const config: Config = {
  // Triggers dark variants when [data-theme="dark"] is on an ancestor element
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './config/**/*.ts',
  ],
  theme: {
    // Replaces Tailwind defaults — aligned with design_handoff_casino breakpoints
    screens: {
      xs: '420px',
      sm: '620px',
      md: '760px',
      lg: '860px',
      xl: '1080px',
      '2xl': '1200px',
    },
    extend: {
      // All colors reference CSS variables declared in app/globals.css
      // CSS variables are swapped by [data-theme="dark"] — no Tailwind dark: prefix needed
      colors: {
        bg: 'var(--bg)',
        'bg-sunken': 'var(--bg-sunken)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        line: 'var(--line)',
        'line-2': 'var(--line-2)',
        green: {
          DEFAULT: 'var(--green)',
          700: 'var(--green-700)',
          50: 'var(--green-50)',
          ink: 'var(--green-ink)',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          50: 'var(--gold-50)',
          ink: 'var(--gold-ink)',
        },
        red: {
          DEFAULT: 'var(--red)',
          50: 'var(--red-50)',
          ink: 'var(--red-ink)',
        },
        star: 'var(--star)',
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '16px',
        xl: '22px',
      },
      boxShadow: {
        '1': 'var(--sh-1)',
        '2': 'var(--sh-2)',
        '3': 'var(--sh-3)',
      },
      fontFamily: {
        serif: ['var(--font-newsreader)', 'Georgia', 'serif'],
        sans: [
          'var(--font-hanken)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      maxWidth: {
        site: '1200px',
      },
    },
  },
  plugins: [],
}

export default config
