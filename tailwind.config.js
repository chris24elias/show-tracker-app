// tailwind.config.js
const nativewind = require('nativewind/tailwind')

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewind],
  plugins: [],
  theme: {
    extend: {}
  }
}
