import { CustomVendorGrants } from '../sourcepoint/typings';
import { GroupedPurposes, RelationsDump, VendorPurposeMappingPurpose, VendorPurposeMappings } from './typings';
import { PURPOSE_TYPE_CONSENT, PURPOSE_TYPE_LEGITIMATE_INTEREST } from './custom-purposes';

export const PUR_SESSION_STORAGE_KEY = '__cmp_pur_embeds_enabled';

const grantedVendors = new Set<string>();
const vendorPurposeMappings = new Map<string, VendorPurposeMappingPurpose[]>();
const purposeVendorMappings = new Map<string, Set<string>>();

export const configureGrants = (grants: CustomVendorGrants): void => {
  grantedVendors.clear();

  for (const [vendorId, value] of Object.entries(grants)) {
    const { vendorGrant } = value;

    if (vendorGrant) {
      grantedVendors.add(vendorId);
    }
  }
};

export const configureVendorPurposeMapping = (mapping: VendorPurposeMappings): void => {
  mapping.forEach((entry) => {
    vendorPurposeMappings.set(entry.vendorId, entry.categories);

    entry.categories.forEach((category) => {
      let vendorIds = purposeVendorMappings.get(category._id);

      if (!vendorIds) {
        vendorIds = new Set<string>();
        purposeVendorMappings.set(category._id, vendorIds);
      }

      vendorIds.add(entry.vendorId);
    });
  });
};

export const vendorHasGrant = (vendorId: string): boolean => grantedVendors.has(vendorId);

export const vendorHasPurpose = (vendorId: string, purposeId: string): boolean => {
  const categories = vendorPurposeMappings.get(vendorId);

  if (!categories) {
    return false;
  }

  return Boolean(categories.find((category) => category._id === purposeId));
};

export const getGrantedVendors = (): string[] => [...grantedVendors];

export const getGrantedVendorsPUR = (): string[] => {
  try {
    const item = window.sessionStorage.getItem(PUR_SESSION_STORAGE_KEY);

    if (!item) {
      return [];
    }

    const { consentedVendors } = JSON.parse(item);

    if (!Array.isArray(consentedVendors)) {
      return [];
    }

    return consentedVendors;
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const setGrantedVendorsPUR = (vendorIds: string[]): void => {
  try {
    window.sessionStorage.setItem(PUR_SESSION_STORAGE_KEY, JSON.stringify({ consentedVendors: vendorIds }));
  } catch (e) {
    console.error(e);
  }
};

export const getPurposesForVendor = (vendorId: string): GroupedPurposes => {
  const purposes = vendorPurposeMappings.get(vendorId);

  if (!purposes) {
    return {
      purposeIds: [],
      legitimateInterestIds: [],
    };
  }

  return purposes.reduce<GroupedPurposes>(
    (acc, current) => {
      if (current.type === PURPOSE_TYPE_CONSENT) {
        acc.purposeIds.push(current._id);
      }

      if (current.type === PURPOSE_TYPE_LEGITIMATE_INTEREST) {
        acc.legitimateInterestIds.push(current._id);
      }

      return acc;
    },
    {
      purposeIds: [],
      legitimateInterestIds: [],
    },
  );
};

export const getVendorIdsForPurpose = (purposeId: string): string[] =>
  Array.from<string>(purposeVendorMappings.get(purposeId) || []);

export const dumpPurposeRelations = (purposeId: string): RelationsDump => {
  const vendorIds = getVendorIdsForPurpose(purposeId);

  const purposes: GroupedPurposes = vendorIds.reduce<GroupedPurposes>(
    (acc, vendorId) => {
      const { purposeIds: pIds, legitimateInterestIds: lIds } = getPurposesForVendor(vendorId);

      acc.purposeIds.push(...pIds);
      acc.legitimateInterestIds.push(...lIds);

      return acc;
    },
    {
      purposeIds: [],
      legitimateInterestIds: [],
    },
  );

  const { purposeIds, legitimateInterestIds } = purposes;

  return {
    vendorIds,
    purposeIds: [...new Set(purposeIds)],
    legitimateInterestIds: [...new Set(legitimateInterestIds)],
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
