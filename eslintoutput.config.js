module.exports = {
  files: ['.'],
  formats: [
    {
      name: 'stylish',
      output: 'console',
    },
    {
      name: 'junit',
      output: 'file',
      path: 'tmp/junit.xml',
      id: 'myJunit',
    },
  ],
};
