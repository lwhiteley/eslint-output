#!/usr/bin/env node

const CLIEngine = require('eslint').CLIEngine;
const path = require('path');
const yargs = require('yargs');
const write = require('write');
const debug = require('debug')('eslint-output');
const rc = require('./config');

const cwd = path.resolve(process.cwd());
const { maxWarnings } = yargs.argv;

const cli = new CLIEngine(
  Object.assign(
    {
      envs: ['browser', 'mocha'],
      useEslintrc: true,
    },
    rc.cliEngineConfig,
    { cwd },
  ),
);

const report = cli.executeOnFiles(rc.files || ['.']);

const outputs = {
  console(output) {
    return console.log(output);
  },
  file(output, format) {
    if (!format.path) {
      return debug(
        `a 'path' prop is required for this format (${
          format.name
        }), please specify and run again`,
      );
    }
    try {
      return write.sync(path.resolve(cwd, format.path), output);
    } catch (e) {
      return debug(
        `Could not write file for eslint format: ${format.name} - ${e.message}`,
      );
    }
  },
};

let formats = rc.formats;

if (!Array.isArray(rc.formats)) {
  formats = [{ name: 'stylish' }];
  debug("using default format 'stylish'");
}

formats.forEach(format => {
  const formatter = cli.getFormatter(format.name);
  if (formatter) {
    const outputMethod = outputs[format.output] || outputs.console;
    outputMethod(formatter(report.results), format, report);
  } else {
    debug(`could not find formatter with name ${format.name}`);
  }
});

if (
  report.errorCount > 0 ||
  (typeof maxWarnings === 'number' && report.warningCount > maxWarnings)
) {
  process.exitCode = 1;
  debug('exited with code: 1');
}
