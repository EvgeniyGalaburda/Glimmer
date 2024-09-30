import daisyui from 'daisyui'
import daisyuiUIThemes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    require('tailwindcss-animated'),
    require('tailwind-scrollbar')
  ],

  daisyui:{
    themes: [
      "cupcake",
      {
        black: {
          ...daisyuiUIThemes['dracula'],
        }
      }
    ]
  }
}