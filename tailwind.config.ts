import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        added: '#d1f4e0',
        removed: '#ffd7d5',
        modified: '#fff4ce',
        'added-dark': '#0e4429',
        'removed-dark': '#82071e',
        'modified-dark': '#9a6700',
      },
    },
  },
  plugins: [],
}
export default config
