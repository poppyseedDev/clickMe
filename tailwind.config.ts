import type { Config } from 'tailwindcss'

const config: Config  = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
      lineHeight: {
        '20': '5rem',
      },
      maxWidth: {
        '9xl': '80rem',
      },
      gridTemplateColumns: {
        // Simple first column bigger, other same size smaller
        'first-big': '3fr repeat(3, minmax(0, 1fr))',
      },
      fontFamily: {
        montserrat: 'var(--font-montserrat)',
        syncopate: 'var(--font-syncopate)',
      },
    },
  },
  plugins: [],
}


export default config
