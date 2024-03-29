const shell = require('shelljs');
const emojiMsg = require('node-emoji');
const colors = require('colors-cli/safe');

const buildTypeArg = process?.argv[3];
const buildType = `node dist/src/index.js --config __mocks__/${buildTypeArg}`;

shell.exec(buildType, { silent: true }, (code: Number, stdout: string) => {
  if (buildTypeArg === 'valid') {
    const validMsgCount = stdout.split('success').length;
    const warnMsgCount = stdout.split('warning').length;
    // ensure we are successful and warning the needed
    console.warn(
      `${stdout}\n\n - code: ${code}\n - validMsgCount: ${validMsgCount}\n - warnMsgCount: ${warnMsgCount}, `
    );
    if (code !== 0 || validMsgCount !== 6 || warnMsgCount !== 2) {
      console.log(`${emojiMsg.get('x')} - ${colors.red('Invalid exit code or size message returned')}\n\n`);
      return shell.exit(1);
    }
    // console.log(`${emojiMsg.get('thumbsup')} - ${colors.green('Valid exit code and size message returned')}\n\n`);
    return console.log(stdout);
  }

  const invalidMsgCount = stdout.split('failure').length;
  const warnMsgCount = stdout.split('warning').length;
  // ensure we are failing and warning the needed
  console.warn(`code: ${code}\n - invalidMsgCount: ${invalidMsgCount}\n - warnMsgCount: ${warnMsgCount}, `);
  if (code !== 1 || invalidMsgCount !== 6 || warnMsgCount !== 2) {
    console.log(`${emojiMsg.get('x')} - ${colors.red('Invalid exit code or size message returned')}\n\n`);
    return shell.exit(1);
  }
  // console.log(`${emojiMsg.get('thumbsup')} - ${colors.green('Valid exit code and size message returned')}\n\n`);
  return console.log(stdout);
});
