#!/usr/bin/env node

const glob = require('glob');
const bytes = require('bytes');
const fs = require('fs');
const { cosmiconfig } = require('cosmiconfig');
const program = require('commander');
const message = require('./message');
const sizes = require('./sizes');
const diffPercentage = require('./diffPercentage');

type fileType = {
  path: string;
  maxSize?: number;
  minSize?: number;
  compression?: string;
  warnOnly?: boolean;
  lastSize?: boolean;
  externals?: { [key: string]: string };
};
type groupFilesType = fileType[];

program.option('-c, --config <config>', 'path containing file size config setup').parse(process.argv);

const explorer = cosmiconfig('buildsize', ['.buildsizerc.js', 'buildsize.config.js']);

const configPath = program?.config;

module.exports = explorer
  .search(configPath)
  .then(
    (result: {
      config: { failMessage: string; failOnMissingBundles: boolean; files: groupFilesType; lastUpdate?: string };
    }) => {
      const { config } = result;
      const { files, failMessage, failOnMissingBundles = false } = config;
      const hasError = [];
      files.map((file: fileType) => {
        const paths = glob.sync(file.path);
        if (!paths.length) {
          if (failOnMissingBundles) {
            hasError.push('');
            return message('failure', `There is no matching file for ${file.path} in ${process.cwd()}`, '');
          }
          return message('warning', `There is no matching file for ${file.path} in ${process.cwd()}`);
        }
        return paths.map((path: string) => {
          const { maxSize, minSize, compression, externals, lastSize = false } = file;
          const maxFileSize = bytes(maxSize) || Infinity;
          const minFileSize = bytes(minSize) || 0;
          const compressionType = compression || 'raw';
          const size = sizes(fs.readFileSync(path, 'utf8'), compressionType);

          // externals subtract from total size
          let externalsTotalSize = 0;
          if (externals) {
            Object.keys(externals).forEach((idx) => {
              externalsTotalSize += bytes(externals[idx]);
            });
          }
          const externalSize = externalsTotalSize > 0 && bytes(size - externalsTotalSize);
          const finalSize = size - externalsTotalSize;

          // messages for build finalSize checks
          const maxSizeMsg = `${bytes(maxFileSize)} (${compressionType})`;
          const sizeMsg = `${externalSize || bytes(finalSize)}`;

          // minimum size check text
          let minSizeText = '';
          if (minFileSize > 0) minSizeText = `minSize ${bytes(minFileSize)} < `;

          const basicMsg = {
            message: path,
            info: `\n  · ${minSizeText || ''}${sizeMsg} < maxSize ${maxSizeMsg}${
              lastSize ? diffPercentage(maxFileSize, finalSize) : ''
            }`
          };

          // validate build sizes
          const invalidMaxSize = finalSize > maxFileSize;
          const invalidMinSize = finalSize < minFileSize;
          if (invalidMaxSize || invalidMinSize) {
            if (file.warnOnly) return message('warning', basicMsg.message, basicMsg.info);
            hasError.push('');
            return message('failure', basicMsg.message, basicMsg.info);
          }
          return message('success', basicMsg.message, basicMsg.info);
        });
      });
      if (hasError.length) {
        message(
          'exit',
          `Build size check has failed in ${hasError.length} file${hasError.length > 1 ? 's' : ''}\n${
            failMessage || ''
          }`
        );
      } else {
        message('complete', `Build size checks have passed, please continue on.`);
      }
    }
  )
  .catch((error: any) => {
    console.warn(error);
    return message('exit', `Sorry, cannot find a valid config file in ${configPath || 'root'} path\n`);
  });
