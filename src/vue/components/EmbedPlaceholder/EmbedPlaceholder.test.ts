import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { EmbedPlaceholder } from './';
import { getRelations, PURPOSE_ID_SOCIAL } from '../../../vendor-mapping';

const loadPrivacyManagerModal = jest.fn();

const privacyManagerStub = Vue.extend({
  name: 'PrivacyManager',
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$scopedSlots.default!({
        loadPrivacyManagerModal,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
  },
});

const customConsent = jest.fn();

const consentActionsStub = Vue.extend({
  name: 'ConsentActions',
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$scopedSlots.default!({
        customConsent,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
  },
});

describe('EmbedPlaceholder', () => {
  afterEach(() => {
    loadPrivacyManagerModal.mockReset();
  });

  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholder, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });

  it('should give a consent to the purpose social media', () => {
    const wrapper = mount(EmbedPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { privacyManagerId: 1234 },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(customConsent).toHaveBeenCalledWith({
      purposeIds: [PURPOSE_ID_SOCIAL],
      vendorIds: getRelations(PURPOSE_ID_SOCIAL),
    });
  });

  describe('should open a privacy manager by clicking on', () => {
    it.each([
      ['the link to the description', '.embed-placeholder__link-description'],
      ['the link to the vendor list', '.embed-placeholder__link-vendor-list'],
    ])('%s', (_, selector) => {
      const wrapper = mount(EmbedPlaceholder, {
        stubs: { PrivacyManager: privacyManagerStub },
        propsData: { privacyManagerId: 12345 },
      });

      wrapper.find(selector).trigger('click');

      expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
      expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
    });
  });
});
