import { CustomVendorGrants } from '../sourcepoint/typings';

const purposeRelations = new Map<string, Set<string>>();
const vendorRelations = new Map<string, Set<string>>();
const grantedVendors = new Set<string>();

type RelationsDump = {
  vendorIds: string[];
  purposeIds: string[];
};

export const configureGrants = (grants: CustomVendorGrants): void => {
  purposeRelations.clear();
  vendorRelations.clear();
  grantedVendors.clear();

  for (const [vendorId, value] of Object.entries(grants)) {
    const { vendorGrant, purposeGrants } = value;

    const hasGrant = Object.values(purposeGrants).every(Boolean) && vendorGrant;

    if (hasGrant) {
      grantedVendors.add(vendorId);
    }

    vendorRelations.set(vendorId, new Set(Object.keys(purposeGrants)));

    Object.keys(purposeGrants).forEach((purposeId) => {
      if (!purposeRelations.has(purposeId)) {
        purposeRelations.set(purposeId, new Set());
      }

      (<Set<string>>purposeRelations.get(purposeId)).add(vendorId);
    });
  }
};

export const vendorHasGrant = (vendorId: string): boolean => grantedVendors.has(vendorId);

export const getGrantedVendors = (): string[] => [...grantedVendors];

export const getRelations = (key: string, map: Map<string, Set<string>>): string[] => Array.from(map.get(key) || []);

export const getPurposeIdsForVendor = (vendorId: string): string[] => getRelations(vendorId, vendorRelations);

export const getVendorIdsForPurpose = (purposeId: string): string[] => getRelations(purposeId, purposeRelations);

export const dumpPurposeRelations = (purposeId: string): RelationsDump => {
  const vendorIds = getVendorIdsForPurpose(purposeId);
  const purposes: string[][] = vendorIds.reduce<string[][]>(
    (acc, vendorId) => {
      acc.push(getPurposeIdsForVendor(vendorId));
      return acc;
    },
    [[purposeId]],
  );

  const purposeIds = new Set<string>(purposes.flat());

  return {
    vendorIds,
    purposeIds: [...purposeIds],
  };
};
