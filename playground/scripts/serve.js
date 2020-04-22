const { existsSync } = require('fs');
const handler = require('serve-handler');
const http = require('http');

const serve = () => {
  const publicDir = './playground/public';

  if (!existsSync(publicDir)) {
    console.error('Build directory not found. Please run "npm run playground:prepare".');
    return;
  }

  const parameters = require('../public/build/parameters.json');

  const server = http.createServer((request, response) => {
    return handler(request, response, { public: publicDir });
  });

  const { port = 5000 } = new URL(parameters.host);

  server.listen(port, () => {
    console.log(
      `Running at:\n${parameters.host}/build/esm (esm bundle)\n${parameters.host}/build/browser (browser bundle)`,
    );
  });
};

module.exports = {
  serve,
};

if (require.main === module) {
  serve();
}
