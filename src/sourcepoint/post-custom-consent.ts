import { PostCustomConsentPayload, PostCustomConsentResult } from './typings';

export const postCustomConsent = ({
  vendorIds = [],
  purposeIds = [],
  legitimateInterestIds = [],
}: PostCustomConsentPayload): Promise<PostCustomConsentResult | null> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.__tcfapi) {
      return reject();
    }

    window.__tcfapi(
      'postCustomConsent',
      2,
      (data: PostCustomConsentResult | null, success: boolean) => {
        if (!success) {
          return reject(data);
        }

        resolve(data);
      },
      vendorIds,
      purposeIds,
      legitimateInterestIds,
    );
  });
};
