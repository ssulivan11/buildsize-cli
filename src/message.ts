const colorsCli = require('colors-cli/safe');
const shelljs = require('shelljs');
const emoji = require('node-emoji');

module.exports = (type: string, message: string, info: string) => {
  if (type === 'exit') {
    console.log(`\n\n${emoji.get('poop')} ${message}\n`);
    return shelljs.exit(1);
  }
  if (type === 'complete') return console.log(`\n\n${emoji.get('rocket')} ${message}\n`);
  if (type === 'failure') return console.log(colorsCli.black.red_bbt('\n failure '), colorsCli.red(message), info);
  if (type === 'warning')
    return console.log(colorsCli.black.yellow_bbt('\n warning '), colorsCli.yellow(message), info);
  return console.log(colorsCli.black.green_bbt('\n success '), colorsCli.green(message), info);
};
