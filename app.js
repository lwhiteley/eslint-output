#!/usr/bin/env node

const { CLIEngine } = require('eslint');
const path = require('path');
const yargs = require('yargs');
const write = require('write');
const debug = require('debug')('eslint-output');
const rc = require('./config');

const cwd = path.resolve(process.cwd());
const { maxWarnings, quiet } = yargs.options({
  maxWarnings: { type: 'number', default: false },
  quiet: { type: 'boolean', default: false },
}).argv;

const config = {
  useEslintrc: true,
  ...(rc.cliEngineConfig || {}),
  cwd,
};
const filesToVerify = rc.files || ['.'];

const cli = new CLIEngine(config);
const report = cli.executeOnFiles(filesToVerify);

if (quiet) {
  report.results = CLIEngine.getErrorResults(report.results);
}

const outputs = {
  console(output) {
    return console.log(output);
  },
  file(output, format) {
    if (!format.path) {
      return debug(
        `a 'path' prop is required for this format (${format.name}), please specify and run again`,
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

let { formats } = rc;

if (!Array.isArray(rc.formats)) {
  formats = [{ name: 'stylish' }];
  debug("using default format 'stylish'");
}

formats.forEach((format) => {
  const formatter = cli.getFormatter(format.name);
  if (formatter) {
    const outputMethod = outputs[format.output] || outputs.console;
    outputMethod(formatter(report.results), format, report);
  } else {
    debug(`could not find formatter with name ${format.name}`);
  }
});

const isRunFailed = () => {
  const exceededMaxWarnings =
    typeof maxWarnings === 'number' && report.warningCount > maxWarnings;
  return report.errorCount > 0 || exceededMaxWarnings;
};

if (isRunFailed()) {
  process.exitCode = 1;
  debug('exited with code: 1');
}
