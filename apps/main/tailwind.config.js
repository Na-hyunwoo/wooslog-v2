const sharedConfig = require('@wooslog/tailwind-config/base');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...sharedConfig,
  content: [...sharedConfig.content, './app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
};
