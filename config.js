const { cosmiconfigSync } = require('cosmiconfig');

const explorerSync = cosmiconfigSync('eslintoutput');

const searchedFor = explorerSync.search();

module.exports = {
  files: ['.'],
  formats: [
    {
      name: 'stylish',
      output: 'console',
    },
  ],
  ...searchedFor.config,
};
