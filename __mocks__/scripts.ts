const shell = require('shelljs');
const emojiMsg = require('node-emoji');
const chalkMsg = require('chalk');

const buildTypeArg = process?.argv[3];
const buildType = `node dist/index.js --config __mocks__/${buildTypeArg}`;

shell.exec(buildType, { silent: true }, (code: Number, stdout: string) => {
  if (buildTypeArg === 'valid') {
    const validMsgCount = stdout.split('success').length;
    if (code !== 0 || validMsgCount !== 6) {
      console.log(`${emojiMsg.get('x')} - ${chalkMsg.red('Invalid exit code or size message returned')}\n\n`);
      return shell.exit(1);
    }
    // console.log(`${emojiMsg.get('thumbsup')} - ${chalkMsg.green('Valid exit code and size message returned')}\n\n`);
    return console.log(stdout);
  }

  const invalidMsgCount = stdout.split('failure').length;
  const warnMsgCount = stdout.split('warning').length;
  if (code !== 1 || invalidMsgCount !== 4 || warnMsgCount !== 2) {
    console.log(`${emojiMsg.get('x')} - ${chalkMsg.red('Invalid exit code or size message returned')}\n\n`);
    return shell.exit(1);
  }
  // console.log(`${emojiMsg.get('thumbsup')} - ${chalkMsg.green('Valid exit code and size message returned')}\n\n`);
  return console.log(stdout);
});
