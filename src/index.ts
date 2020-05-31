#!/usr/bin/env node

const glob = require('glob');
const bytes = require('bytes');
const fs = require('fs');
const { cosmiconfig } = require('cosmiconfig');
const program = require('commander');
const message = require('./message');
const sizes = require('./sizes');

type fileType = {
  path: string;
  maxSize?: number;
  minSize?: number;
  compression?: string;
  warnOnly?: boolean;
  externals?: { [key: string]: string };
};
type groupFilesType = fileType[];

program.option('-c, --config <config>', 'path containing file size config setup').parse(process.argv);

const explorer = cosmiconfig('buildsizes', ['.buildsizes.json', '.buildsizes.js', 'buildsizes.config.js']);

const configPath = program?.config;

module.exports = explorer
  .search(configPath)
  .then((result: { config: { failMessage: string; files: groupFilesType } }) => {
    const { config } = result;
    const { files, failMessage } = config;
    const hasError = [];
    files.map((file: fileType) => {
      const paths = glob.sync(file.path);
      if (!paths.length) {
        return message('exit', `Sorry, there is no matching file for ${file.path} in ${process.cwd()}`);
      }
      return paths.map((path: string) => {
        const { maxSize, minSize, compression, externals } = file;
        const maxFileSize = bytes(maxSize) || Infinity;
        const minFileSize = bytes(minSize) || 0;
        const size = sizes(fs.readFileSync(path, 'utf8'), compression);

        // externals subtract from total size
        let externalsTotalSize = 0;
        if (externals) {
          Object.keys(externals).forEach((idx) => {
            externalsTotalSize += bytes(externals[idx]);
          });
        }
        const externalSize = externalsTotalSize > 0 && bytes(size - externalsTotalSize);

        // messages for build size checks
        const maxSizeMsg = `${bytes(maxFileSize)} (${compression}d)`;
        const sizeMsg = `${externalSize || bytes(size)}`;

        let minSizeText = '';
        if (minFileSize > 0) minSizeText = `minSize ${bytes(minFileSize)} < `;

        const basicMsg = `${path}\n          ${minSizeText || ''}${sizeMsg} < maxSize ${maxSizeMsg}`;

        // validate build sizes
        const invalidMaxSize = size - externalsTotalSize > maxFileSize;
        const invalidMinSize = size - externalsTotalSize < minFileSize;
        if (invalidMaxSize || invalidMinSize) {
          if (file.warnOnly) return message('warning', basicMsg);
          hasError.push('');
          return message('failure', basicMsg);
        }
        return message('success', basicMsg);
      });
    });
    if (hasError.length) {
      message(
        'exit',
        `Build size check has failed in ${hasError.length} file${hasError.length > 1 ? 's' : ''}\n${failMessage || ''}`
      );
    } else {
      message('complete', `Build size check have passed, please continue on.`);
    }
  })
  .catch(() => {
    return message('exit', `Sorry, cannot find config file in ${configPath || 'root'} path\n`);
  });
