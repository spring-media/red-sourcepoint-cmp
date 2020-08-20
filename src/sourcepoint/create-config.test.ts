import { createConfig } from './create-config';

describe('createConfig', () => {
  it('should return the expected config object with defaults', () => {
    const config = createConfig({
      accountId: 123,
    });

    expect(config).toEqual({
      accountId: 123,
      baseEndpoint: 'https://cmp2.bild.de',
    });
  });

  it('should return the expected config object', () => {
    const parameters = {
      accountId: 123,
      baseEndpoint: 'baseEndpoint',
    };

    const config = createConfig(parameters);

    expect(config).toEqual(parameters);
  });
});
