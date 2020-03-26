import { vendorsMapByName, vendorsMapById } from './vendors';
import { purposeMapByName, purposeMapById } from './purposes';
import { PurposeMappingName, VendorMappingName } from './types';
import { relationshipsById, relationshipsByName } from './relationships';

const getIdByName = <T>(map: Map<T, string>) => (name: T): string | undefined => map.get(name);

const getNameById = <T>(map: Map<string, T>) => (id: string): T | undefined => map.get(id);

export const getVendorIdByName = getIdByName<VendorMappingName>(vendorsMapByName);

export const getPurposeIdByName = getIdByName<PurposeMappingName>(purposeMapByName);

export const getVendorNameById = getNameById<VendorMappingName>(vendorsMapById);

export const getPurposeNameById = getNameById<PurposeMappingName>(purposeMapById);

export const hasRelationByName = (vendorName: VendorMappingName, purposeName: PurposeMappingName): boolean => {
  if (relationshipsByName.has(purposeName)) {
    return (relationshipsByName.get(purposeName) as VendorMappingName[]).includes(vendorName);
  }

  return false;
};

export const hasRelationById = (vendorId: string, purposeId: string): boolean => {
  if (relationshipsById.has(purposeId)) {
    return (relationshipsById.get(purposeId) as string[]).includes(vendorId);
  }

  return false;
};

export const getVendorPurposesByName = (vendorName: VendorMappingName): PurposeMappingName[] => {
  if (relationshipsByName.has(vendorName)) {
    return relationshipsByName.get(vendorName) as PurposeMappingName[];
  }

  return [];
};

export const getVendorPurposesById = (vendorId: string): string[] => {
  if (relationshipsById.has(vendorId)) {
    return relationshipsById.get(vendorId) as string[];
  }

  return [];
};
