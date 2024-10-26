# eslint-output

[![npm version](https://badge.fury.io/js/eslint-output.svg)](https://badge.fury.io/js/eslint-output)

### Getting started

Install `eslint-output` using `npm` or your favorite node modules manager.

```shell
npm i --save-dev eslint-output
```

#### Getting started: Next Steps

- Configure eslint using Flat Config
- Create a script in your package json eg. `"eslint-output": "eslint-output"`
- Configure eslint-output with `eslintoutput.config.js` placed at the root of your project's directory. See example below
- Run `npm run eslint-output` or `yarn run eslint-output`. See below for command line options.

**Example `eslintoutput.config.js`**

```js
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
```

##### Command line options

| Option                     | Value       | Description                                                                                                                          |
| -------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `--quiet`, `-q`            |             | Don't report warnings, only errors                                                                                                   |
| `--max-warnings`, `-m`     | `Int`       | Maximum number of warnings before the process returns an unsuccessful error code                                                     |
| `--format-overrides`, `-o` | `String`(s) | Override key(s) in specific format array item(s), using format `id.key=value`.<br />`id` field must be added to desired format item. |

Files to be checked can also be passed in the command, e.g.

```shell
npm run eslint-output src/**/*.js test/**/*.js
```

This will override the `files` array in `eslintoutput.config.js`.

Multiple format overrides can be passed in one command, e.g.

```shell
npm run eslint-output -o gitlab.path="path/to/file.json" myJunit.output=console -- src/**/*.js
```

or even

```shell
npm run eslint-output -o gitlab.path="path/to/file.json" -q  -o myJunit.output=console -- src/**/*.js
```

#### Notes:

- File paths are relative to the current working directory.
- Please be mindful that a lot of formatters have been removed from the core eslint
  - these removed formatters must be installed separately. eg. `eslint-formatter-junit`
- Pull requests are welcome!

### Breaking changes

- config file is now `eslintoutput.config.js`.
