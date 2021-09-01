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

##### Commad line options

```
--quiet                         Don't report warnings, only errors
--max-warnings Int              Maximum number of warnings before the process returns an unsucessful error code
```

#### Notes:

- It is optional to also specify configs for the eslint CLI engine using the `eslintConfig` property. See https://eslint.org/docs/developer-guide/nodejs-api#eslint-class for the options. However, it is recommended that you use the `.eslintrc`
- file paths are relative to the current working directory
- pull requests are welcome

### Breaking changes

- removed explicitly setting `envs: ['browser', 'mocha']`
