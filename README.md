eslint-output
========

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
  "config": {}
}
```
NB: 

- It is optional to also specify configs for the 
eslint cliengine using the config property http://eslint.org/docs/developer-guide/nodejs-api#cliengine. However, it is recommended that you use the `.eslintrc`
- file paths are relative to the current working directory

## Notes
- pull requests are welcome

