import { executeMethod } from './tcf';
import { TCDataResult } from '../types';

export const getTCData = (): Promise<TCDataResult> => executeMethod('getTCData');
