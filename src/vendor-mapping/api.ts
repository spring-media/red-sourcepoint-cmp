import { customVendors } from './custom-vendors';
import { customPurposes } from './custom-purposes';
import { relationships } from './relationships';

export const getCustomVendor = (key: string): string | undefined => customVendors.get(key);

export const getCustomPurpose = (key: string): string | undefined => customPurposes.get(key);

export const addCustomVendor = (key: string, value: string): Map<string, string> => customVendors.set(key, value);

export const addCustomPurpose = (key: string, value: string): Map<string, string> => customPurposes.set(key, value);

export const removeCustomVendor = (key: string): boolean => customVendors.delete(key);

export const removeCustomPurpose = (key: string): boolean => customPurposes.delete(key);

export const getRelations = (key: string): string[] | undefined => relationships.get(key);

export const hasRelations = (key: string): boolean => Boolean(relationships.get(key));

export const setRelations = (key: string, relations: string[]): Map<string, string[]> =>
  relationships.set(key, relations);
