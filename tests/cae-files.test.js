const { existsSync, readdirSync, readFileSync } = require('fs');
const { parse, resolve } = require('path');

const prepareTests = () => {
  const caeDir = '.cae';

  if (!existsSync(caeDir)) {
    return [];
  }

  return readdirSync(caeDir)
    .map((file) => parse(file))
    .filter(({ ext }) => ['.css', '.html', '.json'].includes(ext))
    .map(({ base }) => ({ base, path: resolve(caeDir, base) }))
    .map((entry) => ({ name: entry.base, content: readFileSync(entry.path, 'utf8') }))
    .map((entry) => [entry.name, entry.content]);
};

describe('Testsuite CAE files', () => {
  it.each([...prepareTests()])('%s should have the expected content', (name, content) => {
    expect(content).toMatchSnapshot();
  });
});
