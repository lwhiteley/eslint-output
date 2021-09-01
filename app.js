#!/usr/bin/env node

const { ESLint } = require('eslint');
const path = require('path');
const yargs = require('yargs');
const write = require('write');
const debug = require('debug')('eslint-output');
const rc = require('./config');

const cwd = path.resolve(process.cwd());
const { formatOverrides, maxWarnings, quiet, _ } = yargs.options({
  formatOverrides: { type: 'array', alias: 'o' },
  maxWarnings: { type: 'number', alias: 'm' },
  quiet: { type: 'boolean', default: false, alias: 'q' },
}).argv;

const config = {
  useEslintrc: true,
  ...(rc.eslintConfig || {}),
  cwd,
};

const cli = new ESLint(config);

const groupByN = (n, data) => {
  const result = [];
  for (let i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
  return result;
};

const createReport = async () => {
  const filesToVerify = _.length ? _ : rc.files || ['.'];
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

  if (formatOverrides) {
    if (formatOverrides.length % 3) {
      debug(
        `incorrect length of overrides provided: ${formatOverrides.length}`,
      );
    } else {
      const overridesTuples = groupByN(3, formatOverrides);
      overridesTuples.forEach(([index, key, value]) => {
        if (typeof index === 'number' && index >= 0) {
          if (index < formats.length) {
            formats[index][key] = value;
          } else {
            debug(
              `index provided is larger than largest format index: ${index} > ${
                formats.length - 1
              }`,
            );
          }
        } else {
          debug(`invalid index provided: ${index}`);
        }
      });
    }
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

createReport();
