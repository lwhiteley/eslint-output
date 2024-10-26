const { lilconfig } = require('lilconfig');

const options = {
  searchPlaces: ['package.json', 'eslintoutput.config.js'],
  ignoreEmptySearchPlaces: false,
};

async function getConfig() {
  const rc = await lilconfig(
    'eslintoutput',
    options, // optional
  ).search();

  return {
    files: ['.'],
    formats: [
      {
        name: 'stylish',
        output: 'console',
      },
    ],
    ...(rc.config || {}),
  };
}

module.exports = { getConfig };
