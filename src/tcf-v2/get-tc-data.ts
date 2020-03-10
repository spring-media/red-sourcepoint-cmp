import { executeMethod } from './tcf';

export type TCDataResult = {
  consentData: string;
  gdprApplies: boolean;
  hasGlobalScope: boolean;
};

export const getTCData = (): Promise<TCDataResult> =>
  executeMethod('getTCData');
