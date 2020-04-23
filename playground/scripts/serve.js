const chalk = require('chalk');
const { existsSync } = require('fs');
const handler = require('serve-handler');
const http = require('http');
const { prepare } = require('./prepare');

const serve = async () => {
  const publicDir = './playground/public';

  if (!existsSync(publicDir) || !existsSync(`${publicDir}/build/parameters.json`)) {
    await prepare();
  }

  const parameters = require('../public/build/parameters.json');

  const printParameters = () =>
    [...Object.entries(parameters)].map(([key, value]) => `${chalk.green(key)}: ${value}`).join('\n');

  console.log(`
${chalk.grey('----------------------------')}
Using following parameters for playground:

${printParameters()}

Run ${chalk.yellow('npm run playground:prepare')} to change the parameters. 
${chalk.grey('----------------------------')}
  `);

  const server = http.createServer((request, response) => {
    return handler(request, response, { public: publicDir });
  });

  const { port = 5000 } = new URL(parameters.host);

  server.listen(port, () => {
    console.log(`Running at:
${parameters.host}/build/esm ${chalk.grey('(esm bundle)')}
${parameters.host}/build/browser ${chalk.grey('(browser bundle)')}
`);
  });
};

module.exports = {
  serve,
};

if (require.main === module) {
  serve().catch((error) => console.error(error));
}
