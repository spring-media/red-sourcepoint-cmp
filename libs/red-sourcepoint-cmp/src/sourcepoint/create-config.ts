import { Config } from './typings';

export const createConfig = (parameters: Config): Config => ({
  accountId: 0,
  baseEndpoint: 'https://cmp2.bild.de',
  ...parameters,
});
