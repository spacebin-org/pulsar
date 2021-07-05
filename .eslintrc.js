module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  env:  {
    es6: true,
    browser: true
  },
  plugins: [
    'svelte3',
    '@typescript-eslint'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-typescript/base',
  ],
  settings: {
    'svelte3/typescript': () => require('typescript'),
  }
}
