import { executeMethod } from './tcf';
import { CustomVendorConsentsResult } from '../types';

export const getCustomVendorConsents = (): Promise<CustomVendorConsentsResult> =>
  executeMethod('getCustomVendorConsents');
