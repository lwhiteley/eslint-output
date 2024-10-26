const globals = require('globals');
const js = require('@eslint/js');
const eslintConfigPrettier = require('eslint-config-prettier');

module.exports = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'comma-dangle': [1, 'always-multiline'],
      'arrow-body-style': [0],
      'global-require': 0,
      'no-console': 'warn',
      'no-unused-expressions': 'error',
    },
  },
  {
    ignores: [
      'node_modules',
      'tmp',
      'helpers/test-setup.js',
      'coverage',
      '.nyc_output',
      'tmp.js',
      '.github',
      'eslintoutput.config.js',
    ],
  },
];
