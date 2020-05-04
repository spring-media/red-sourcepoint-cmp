const chalk = require('chalk');
const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codecept run
setHeadlessWhen(process.env.HEADLESS);

let playgroundParams;
try {
  playgroundParams = require('../../public/build/parameters.json');
} catch (e) {
  console.error(chalk.red('parameters.json not found. Please run "npm run playground:prepare".\n'));

  process.exit(1);
}

exports.config = {
  tests: './specs/*.specs.ts',
  output: './output',
  helpers: {
    Playwright: {
      url: playgroundParams.host,
      show: false,
      browser: 'chromium',
    },
  },
  include: {
    I: './typings/steps_file.js',
    playgroundParams: '../../public/build/parameters.json',
  },
  bootstrap: null,
  mocha: {},
  name: 'red-sourcepoint-cmp',
  plugins: {
    retryFailedStep: {
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
  },
  require: ['ts-node/register'],
};
