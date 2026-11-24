// Aturan inti sama dengan package pph-21 di program ini:
// @eslint/js recommended + eslint-plugin-import di ESLint 9.
// no-console di library, ===, prefer-const, no-var, no-unused-vars.
import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  {
    plugins: { import: importPlugin },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-console': 'error',
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'error',
      'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ForInStatement',
          message: 'for...in dilarang, pakai Object.keys/map/for...of.',
        },
      ],
    },
  },
  {
    files: ['bin/**/*.js', 'examples/**/*.js'],
    rules: { 'no-console': 'off' },
  },
  {
    files: ['test/**/*.js'],
    languageOptions: {
      globals: { console: 'readonly' },
    },
    rules: { 'no-console': 'off' },
  },
];
