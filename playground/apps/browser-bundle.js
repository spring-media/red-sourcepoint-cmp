import '../../dist/browser/red-cmp';
import 'cmp-embed-placeholder.css'; // @see compile.js
import './common.css';

(function (lib) {
  lib.onPrivacyManagerAction((...args) => console.log('onPrivacyManagerAction', ...args));
  lib.onMessageReady((...args) => console.log('onMessageReady', ...args));
  lib.onConsentReady((...args) => console.log('onConsentReady', ...args));
  lib.onPMCancel((...args) => console.log('onPMCancel', ...args));
  lib.onMessageChoiceSelect((...args) => console.log('onMessageChoiceSelect', ...args));
  lib.onMessageChoiceError((...args) => console.log('onMessageChoiceError', ...args));

  lib.addEventListener((...args) => console.log('addEventListener', ...args));

  const checkConsents = async () => {
    const { consentedPurposes = [], consentedVendors = [] } = await lib.getCustomVendorConsents();

    document.querySelectorAll('[data-vendor-name]').forEach((element) => {
      const vendorId = lib.getCustomVendor(element.dataset.vendorName);

      if (
        lib.hasCustomConsentById(vendorId, consentedVendors) ||
        lib.hasCustomConsentById(lib.PURPOSE_ID_SOCIAL, consentedPurposes)
      ) {
        const container = element.querySelector(':scope > div:first-child:not(.processed)');
        if (container) {
          element.dataset.embedPlaceholder = container.innerHTML;
          container.innerHTML = element.querySelector(':scope > script[type="embed/content"]').innerHTML;
          container.classList.add('processed');
        }
      } else {
        if (element.dataset.embedPlaceholder) {
          const container = element.querySelector(':scope > div:first-child');
          container.innerHTML = element.dataset.embedPlaceholder;
          container.classList.remove('processed');
        }
      }
    });
  };

  lib.onConsentReady(checkConsents);

  lib.addEventListener((tcData) => {
    if (tcData.eventStatus === 'tcloaded' || tcData.eventStatus === 'useractioncomplete') {
      checkConsents();
    }
  });

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('embed-placeholder__button')) {
      lib.loadPrivacyManagerModal(window.__playground__.parameters.privacyManagerId);
    }
  });

  document.addEventListener('DOMContentLoaded', checkConsents);
})(window.RedCMP);
