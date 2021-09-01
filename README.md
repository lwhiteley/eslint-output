# eslint-output

[![npm version](https://badge.fury.io/js/eslint-output.svg)](https://badge.fury.io/js/eslint-output)
[![Build Status](https://travis-ci.org/lwhiteley/eslint-output.svg?branch=master)](https://travis-ci.org/lwhiteley/eslint-output)

### Getting started

Install `eslint-output` using `npm` or your favorite node modules manager.

```shell
npm i --save-dev eslint-output
```

#### Getting started: Next Steps

- Configure eslint using `.eslintrc`
- Create an npm script in your package json eg. `"eslint-output": "eslint-output"`
- Configure eslint-output with `.eslintoutputrc` placed at the root of your project's directory. See example below
- Run `npm run eslint-output` or `yarn run eslint-output`. See below for command line options.

**Example `.eslintoutputrc`**

```json
{
  "files": ["."],
  "formats": [
    {
      "name": "stylish",
      "output": "console"
    },
    {
      "name": "junit",
      "output": "file",
      "path": "tmp/junit.xml"
    }
  ],
  "cliEngineConfig": {}
}
```

##### Command line options

| Option                     | Value                          | Description                                                                                                                    |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `--quiet`, `-q`            |                                | Don't report warnings, only errors                                                                                             |
| `--max-warnings`, `-m`     | `Int`                          | Maximum number of warnings before the process returns an unsuccessful error code                                               |
| `--format-overrides`, `-o` | Array: `[Int, String, String]` | Override key in specific format array item.<br />Pass an array of groups of three items, in the pattern `[index, key, value]`. |

Files to be checked can also be passed in the command, e.g.

```shell
npm run eslint-output src/**/*.js test/**/*.js
```

This will override the `files` array in `.eslintoutputrc`.

Multiple format overrides can be passed in one command, e.g.

```shell
npm run eslint-output -o 1 path "path/to/file.json" -o 2 output console -- app.js
```

Be careful that each call contains three elements - an index, a key, and a value to replace with.

#### Notes:

- It is optional to also specify configs for the eslint CLI engine using the `eslintConfig` property. See https://eslint.org/docs/developer-guide/nodejs-api#eslint-class for the options. However, it is recommended that you use the `.eslintrc`.
- File paths are relative to the current working directory.
- Pull requests are welcome!

### Breaking changes

- Removed explicitly setting `envs: ['browser', 'mocha']`.
