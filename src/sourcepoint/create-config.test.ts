import { createConfig } from './create-config';

describe('createConfig', () => {
  it('should return the expected config object with defaults', () => {
    const config = createConfig({
      accountId: 123,
      propertyId: 456,
    });

    expect(config).toEqual({
      accountId: 123,
      propertyId: 456,
      mmsDomain: 'https://message.sp-prod.net',
      wrapperAPIOrigin: 'https://wrapper-api.sp-prod.net/tcfv2',
    });
  });

  it('should return the expected config object', () => {
    const parameters = {
      accountId: 123,
      propertyId: 456,
      mmsDomain: 'mmsDomain',
      wrapperAPIOrigin: 'wrapperAPIOrigin',
    };

    const config = createConfig(parameters);

    expect(config).toEqual(parameters);
  });
});
