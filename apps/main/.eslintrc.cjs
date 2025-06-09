module.exports = {
  extends: ['@wooslog/eslint-config/nextjs.js'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
