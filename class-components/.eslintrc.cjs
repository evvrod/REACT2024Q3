module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['react', 'react-compiler', '@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-var': 'error',
    'max-lines-per-function': [
      'error',
      {
        'max': 180,
        'skipBlankLines': true,
        'skipComments': true,
        'IIFEs': true,
      },
    ],
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'react/react-in-jsx-scope': 'off',
    'react-compiler/react-compiler': 'error',
    'react/prefer-stateless-function': 'off',
  },
};
