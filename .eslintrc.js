/**
 * @fileoverview Configuración de ESLint
 */

module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:cucumber/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['cucumber'],
  rules: {
    'cucumber/no-undefined-definitions': 'error',
    'cucumber/no-unused-definitions': 'error',
    'cucumber/no-pending-definitions': 'error',
    'no-console': 'warn',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'prefer-destructuring': ['error', {
      array: true,
      object: true,
    }],
  },
  overrides: [
    {
      files: ['features/**/*.js'],
      rules: {
        'cucumber/no-undefined-definitions': 'off',
      },
    },
  ],
}; 