module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    mocha: true
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'warn',
    'no-console': 'warn',
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-var': 'warn',
    'eqeqeq': 'warn'
  },
  ignorePatterns: ['node_modules/', 'allure-results/', 'allure-report/', 'test-results/', '*.html', '*.json', '.git/', '.github/']
}; 