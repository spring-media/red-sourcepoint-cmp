import { CustomConsent } from './typings';

export const getRemovedCustomConsents = (consents: CustomConsent[], compareTo: CustomConsent[]): CustomConsent[] => {
  const compareIds = compareTo.map((consent) => consent._id);

  return consents.filter((consent) => !compareIds.includes(consent._id));
};
