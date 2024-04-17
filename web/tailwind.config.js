/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import defaultTheme from 'tailwindcss/defaultTheme';

const tailwindConfig = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: { fontFamily: { sans: ['Inter var', ...defaultTheme.fontFamily.sans] } },
  },
  plugins: [forms],
};

export default tailwindConfig;
