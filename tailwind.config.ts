import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {extend: {}},
  plugins: [
    ({addVariant}: {addVariant: (name: string, selector: string) => void}) => {
      addVariant('rtl', '&[dir="rtl"] &');
      addVariant('ltr', '&[dir="ltr"] &');
    }
  ]
};

export default config;
