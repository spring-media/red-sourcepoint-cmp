import { CustomVendorGrants } from '../sourcepoint/typings';
import { PurposeTypes, RelationsDump, VendorPurposeMappings } from './typings';
import { PURPOSE_TYPE_CONSENT, PURPOSE_TYPE_LEGITIMATE_INTEREST } from './custom-purposes';

const purposeRelations = new Map<string, Set<string>>();
const vendorRelations = new Map<string, Set<string>>();
const grantedVendors = new Set<string>();
const consentPurposes = new Set<string>();
const legIntPurposes = new Set<string>();

const checkForRelationEntry = (map: Map<string, Set<string>>, id: string): void => {
  if (!map.has(id)) {
    map.set(id, new Set());
  }
};

export const configureGrants = (grants: CustomVendorGrants): void => {
  purposeRelations.clear();
  vendorRelations.clear();
  grantedVendors.clear();

  for (const [vendorId, value] of Object.entries(grants)) {
    const { vendorGrant, purposeGrants } = value;

    if (vendorGrant) {
      grantedVendors.add(vendorId);
    }

    vendorRelations.set(vendorId, new Set(Object.keys(purposeGrants)));

    Object.keys(purposeGrants).forEach((purposeId) => {
      checkForRelationEntry(purposeRelations, purposeId);

      (<Set<string>>purposeRelations.get(purposeId)).add(vendorId);
    });
  }
};

export const configureVendorPurposeMapping = (mapping: VendorPurposeMappings): void => {
  consentPurposes.clear();
  legIntPurposes.clear();

  mapping.forEach((entry) => {
    entry.categories.forEach((purpose) => {
      if (purpose.type === PURPOSE_TYPE_LEGITIMATE_INTEREST) {
        legIntPurposes.add(purpose._id);
      }
      if (purpose.type === PURPOSE_TYPE_CONSENT) {
        consentPurposes.add(purpose._id);
      }
    });
  });
};

export const purposeIsType = (purposeId: string, type: PurposeTypes): boolean => {
  if (type === PURPOSE_TYPE_LEGITIMATE_INTEREST) {
    return legIntPurposes.has(purposeId);
  }

  return consentPurposes.has(purposeId);
};

export const vendorHasGrant = (vendorId: string): boolean => grantedVendors.has(vendorId);

export const getGrantedVendors = (): string[] => [...grantedVendors];

export const getRelations = (key: string, map: Map<string, Set<string>>): string[] => Array.from(map.get(key) || []);

export const getPurposeIdsForVendor = (vendorId: string): string[] => getRelations(vendorId, vendorRelations);

export const getVendorIdsForPurpose = (purposeId: string): string[] => getRelations(purposeId, purposeRelations);

export const groupPurposeIds = (purposeIds: string[]): { purposeIds: string[]; legitimateInterestIds: string[] } => ({
  purposeIds: purposeIds.filter((id) => purposeIsType(id, PURPOSE_TYPE_CONSENT)),
  legitimateInterestIds: purposeIds.filter((id) => purposeIsType(id, PURPOSE_TYPE_LEGITIMATE_INTEREST)),
});

export const dumpPurposeRelations = (purposeId: string): RelationsDump => {
  const vendorIds = getVendorIdsForPurpose(purposeId);
  const purposesMap: string[][] = vendorIds.reduce<string[][]>(
    (acc, vendorId) => {
      acc.push(getPurposeIdsForVendor(vendorId));
      return acc;
    },
    [[purposeId]],
  );

  const purposeIds = Array.from(new Set<string>(purposesMap.flat()));

  return {
    vendorIds,
    ...groupPurposeIds(purposeIds),
  };
};

export const loadVendorPurposeMapping = async (propertyId: number): Promise<VendorPurposeMappings> => {
  try {
    const response = await window.fetch(
      `https://sourcepoint.mgr.consensu.org/tcfv2/vendor-list/vendor-purpose-mapping?siteId=${propertyId}`,
    );

    const result = await response.json();

    configureVendorPurposeMapping(result);

    return result;
  } catch (error) {
    console.error(error);

    return [];
  }
};
