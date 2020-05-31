const chalk = require('chalk');
const shelljs = require('shelljs');
const emoji = require('node-emoji');

module.exports = (type: string, message: string) => {
  if (type === 'exit') {
    console.log(`\n\n${emoji.get('poop')} ${message}\n`);
    return shelljs.exit(1);
  }
  if (type === 'complete') return console.log(`\n\n${emoji.get('rocket')} ${message}\n`);
  if (type === 'failure') return console.log(chalk.black.bgRed('\n failure '), chalk.red(message));
  if (type === 'warning') return console.log(chalk.black.bgYellow('\n warning '), chalk.yellow(message));
  return console.log(chalk.black.bgGreen('\n success '), chalk.green(message));
};
