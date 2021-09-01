#!/usr/bin/env node

const { ESLint } = require('eslint');
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
  ...(rc.eslintConfig || {}),
  cwd,
};

const cli = new ESLint(config);

const createReport = async (files = ['.']) => {
  const filesToVerify = files || ['.'];
  let report = await cli.lintFiles(filesToVerify);

  if (quiet) {
    report = ESLint.getErrorResults(report);
  }

  const totalWarnings = report.reduce(
    (prev, cur) => prev + cur.warningCount,
    0,
  );
  const totalErrors = report.reduce((prev, cur) => prev + cur.errorCount, 0);

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

  formats.forEach(async (format) => {
    const formatter = await cli.loadFormatter(format.name);
    if (formatter) {
      const outputMethod = outputs[format.output] || outputs.console;
      outputMethod(formatter.format(report), format, report);
    } else {
      debug(`could not find formatter with name ${format.name}`);
    }
  });

  const isRunFailed = () => {
    const exceededMaxWarnings =
      typeof maxWarnings === 'number' && totalWarnings > maxWarnings;
    return totalErrors > 0 || exceededMaxWarnings;
  };

  if (isRunFailed()) {
    process.exitCode = 1;
    debug('exited with code: 1');
  }
};

createReport(rc.files);
