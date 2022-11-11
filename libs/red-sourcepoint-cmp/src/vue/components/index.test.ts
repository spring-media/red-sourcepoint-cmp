import { readdirSync, lstatSync } from 'fs';

describe('vue components index', () => {
  it('should export the expected modules', () => {
    const directories = readdirSync('./src/vue/components').filter((file) => {
      return lstatSync(`./src/vue/components/${file}`).isDirectory();
    });

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imports = require('./index');
    const keys = Object.keys(imports);

    expect(keys).toEqual(directories);
  });
});
