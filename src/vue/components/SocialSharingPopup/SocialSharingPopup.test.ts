import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { SocialSharingPopup } from './';
import { getRelations, PURPOSE_ID_SOCIAL } from '../../../vendor-mapping';

const loadPrivacyManagerModal = jest.fn();

const privacyManagerStub = Vue.extend({
  name: 'PrivacyManager',
  render() {
    if (this.$scopedSlots.default) {
      return this.$scopedSlots.default({
        loadPrivacyManagerModal,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any;
    }
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

describe('SocialSharingPopup', () => {
  afterEach(() => {
    loadPrivacyManagerModal.mockReset();
  });

  it('should initially render without any errors', () => {
    expect(mount(SocialSharingPopup, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });

  it('should emit close event on button click ', async () => {
    const wrapper = mount(SocialSharingPopup, {
      propsData: { privacyManagerId: 12345 },
    });

    const button = wrapper.find('.social-sharing-popup__button--close');

    button.trigger('click');
    wrapper.vm.$emit('close');

    await Vue.nextTick();
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should open the privacy manager', () => {
    const wrapper = mount(SocialSharingPopup, {
      stubs: { PrivacyManager: privacyManagerStub },
      propsData: { privacyManagerId: 12345 },
    });

    wrapper.find('.social-sharing-popup__description > a').trigger('click');

    expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
    expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
  });

  it('should give a consent to the purpose social media', () => {
    const wrapper = mount(SocialSharingPopup, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { privacyManagerId: 12345 },
    });

    wrapper.find('.social-sharing-popup__button--accept').trigger('click');

    expect(customConsent).toHaveBeenCalledWith({
      purposeIds: [PURPOSE_ID_SOCIAL],
      vendorIds: getRelations(PURPOSE_ID_SOCIAL),
    });
  });
});
