eslint-output
========

[![npm version](https://badge.fury.io/js/eslint-output.svg)](https://badge.fury.io/js/eslint-output)
[![Build Status](https://travis-ci.org/lwhiteley/eslint-output.svg?branch=master)](https://travis-ci.org/lwhiteley/eslint-output)

### Getting started

```shell
npm i --save-dev eslint-output
```
Next Steps

- configure eslint using `.eslintrc`
- create an npm script in your package json eg. `"eslint-output": "eslint-output"`
- configure eslint-output with `.eslintoutputrc` placed at the root of your project's directory. see example below
- run `npm run eslint-output`


Example `.eslintoutputrc`

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
NB:

- It is optional to also specify configs for the eslint cliengine using the `cliEngineConfig` property. See http://eslint.org/docs/developer-guide/nodejs-api#cliengine for the options. However, it is recommended that you use the `.eslintrc`
- file paths are relative to the current working directory

## Notes
- pull requests are welcome

