const chalk = require('chalk');
const { existsSync } = require('fs');
const handler = require('serve-handler');
const http = require('http');
const { prepare } = require('./prepare');

const serve = async () => {
  const publicDir = './playground/public';

  if (!existsSync(publicDir) || !existsSync(`${publicDir}/build/parameters.json`) || process.argv.length > 2) {
    await prepare();
  }

  delete require.cache[require.resolve('../public/build/parameters.json')];
  const parameters = require('../public/build/parameters.json');

  const printParameters = () =>
    [...Object.entries(parameters)].map(([key, value]) => `${chalk.green(key)}: ${value}`).join('\n');

  console.log(`
${chalk.grey('----------------------------')}
Using following parameters for playground:

${printParameters()}

Run ${chalk.yellow('npm run playground:prepare (or use cli parameters)')} to change the parameters. 
${chalk.grey('----------------------------')}
  `);

  const server = http.createServer((request, response) => {
    return handler(request, response, { public: publicDir, cleanUrls: false, renderSingle: false });
  });

  const { port = 5000 } = new URL(parameters.host);

  server.listen(port, () => {
    console.log(`Running at:
${parameters.host}/build/index.html
`);
  });
};

module.exports = {
  serve,
};

if (require.main === module) {
  serve().catch((error) => console.error(error));
}
