import { Config } from './typings';

export const createConfig = (parameters: Config): Config => ({
  accountId: 0,
  wrapperAPIOrigin: 'https://wrapper-api.sp-prod.net/tcfv2',
  propertyId: 0,
  mmsDomain: 'https://message.sp-prod.net',
  ...parameters,
});
