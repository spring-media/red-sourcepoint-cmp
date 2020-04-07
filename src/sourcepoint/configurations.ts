import { ConfigurationParameters, SourcepointConfigurationObject } from './typings';

export const createConfiguration = (parameters: ConfigurationParameters): Partial<SourcepointConfigurationObject> => ({
  config: {
    accountId: parameters.accountId,
    wrapperAPIOrigin: 'https://wrapper-api.sp-prod.net/tcfv2',
    propertyId: parameters.propertyId,
    mmsDomain: 'https://message.sp-prod.net',
    events: parameters.events,
  },
});
