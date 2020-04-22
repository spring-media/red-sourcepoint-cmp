const { existsSync, readdirSync, readFileSync } = require('fs');
const { parse, resolve } = require('path');

const collectFilesFromConfig = () => {
  const caeDir = '.cae';
  const { version } = require('../package.json');
  const config = require(`../.cae/red-cmp-config-${version}.json`);

  return Object.values(config).map((file) => [file, resolve(caeDir, file)]);
};

const prepareTests = () => {
  const caeDir = '.cae';

  return readdirSync(caeDir)
    .map((file) => parse(file))
    .filter(({ ext }) => ['.css', '.html'].includes(ext))
    .map(({ base }) => ({ base, path: resolve(caeDir, base) }))
    .map((entry) => ({ name: entry.base, content: readFileSync(entry.path, 'utf8') }))
    .map((entry) => [entry.name.replace(/-\d+\.\d+\.\d+(\.min)?/, ''), entry.content]);
};

describe('Testsuite CAE files', () => {
  it.each(collectFilesFromConfig())('file %s should exists', (name, path) => {
    expect(existsSync(path)).toBe(true);
  });

  it.each(prepareTests())('%s should have the expected content', (name, content) => {
    expect(content).toMatchSnapshot();
  });
});
