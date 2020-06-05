const chalk = require('chalk');
const shelljs = require('shelljs');
const emoji = require('node-emoji');

module.exports = (type: string, message: string, info: string) => {
  if (type === 'exit') {
    console.log(`\n\n${emoji.get('poop')} ${message}\n`);
    return shelljs.exit(1);
  }
  if (type === 'complete') return console.log(`\n\n${emoji.get('rocket')} ${message}\n`);
  if (type === 'failure') return console.log(chalk.black.bgRed('\n failure '), chalk.red(message), info);
  if (type === 'warning') return console.log(chalk.black.bgYellow('\n warning '), chalk.yellow(message), info);
  return console.log(chalk.black.bgGreen('\n success '), chalk.green(message), info);
};
