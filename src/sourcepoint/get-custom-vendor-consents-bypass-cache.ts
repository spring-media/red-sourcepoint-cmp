import { CustomVendorConsentsResult } from './typings';
import { getIABStubScript } from './iab-stub-script';
import { getClientLibraryUrl } from './client-library-url';
import { getCustomVendorConsents } from './get-custom-vendor-consents';

export const getCustomVendorConsentsBypassCache = (): Promise<CustomVendorConsentsResult> => {
  // Check browser support for srcdoc attribute (i'm talking to you IE)
  if (!Boolean('srcdoc' in document.createElement('iframe'))) {
    return getCustomVendorConsents();
  }

  if (!window._sp_?.config) {
    return getCustomVendorConsents();
  }

  const { accountId, wrapperAPIOrigin, propertyId, mmsDomain } = window._sp_.config;

  return new Promise((resolve) => {
    const iframe = document.createElement('iframe');
    iframe.srcdoc = `
      <script>${getIABStubScript()}</script>
      <script>
        window._sp_ = {
          config: {
            accountId: ${accountId},
            wrapperAPIOrigin: '${wrapperAPIOrigin}',
            propertyId: ${propertyId},
            mmsDomain: '${mmsDomain}',
          },
        };
      </script>
      <script src="${getClientLibraryUrl()}"></script>
      <script>
        __tcfapi('getCustomVendorConsents', 2, function(consents) {
          window.parent.postMessage({ type: 'cmp', consents: consents }, '*');
        });
      </script>
    `;

    const onMessage = (event: MessageEvent): void => {
      if (!event.data || event.data.type !== 'cmp') {
        return;
      }

      window.removeEventListener('message', onMessage);
      document.body.removeChild(iframe);

      return resolve(event.data.consents);
    };

    window.addEventListener('message', onMessage, false);

    document.body.appendChild(iframe);
  });
};
