const rc = require('rc');

module.exports = rc('eslintoutput', {
  files: ['.'],
  formats: [
    {
      name: 'stylish',
      output: 'console',
    },
  ],
});
