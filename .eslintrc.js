module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true,
    jquery: true,
  },
  globals: {
    browser: 'readonly',
    $: 'readonly',
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-var': 'warn',
    eqeqeq: 'warn',
    'no-useless-escape': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    'allure-results/',
    'allure-report/',
    'test-results/',
    '*.html',
    '*.json',
    '.git/',
    '.github/',
  ],
};
