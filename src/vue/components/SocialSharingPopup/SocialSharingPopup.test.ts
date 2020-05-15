import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { SocialSharingPopup } from './';
import { PURPOSE_ID_SOCIAL } from '../../../vendor-mapping';

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

const consentCustomPurpose = jest.fn();

const consentActionsStub = Vue.extend({
  name: 'ConsentActions',
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$scopedSlots.default!({
        consentCustomPurpose,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
  },
});

describe('SocialSharingPopup', () => {
  afterEach(() => {
    loadPrivacyManagerModal.mockReset();
  });

  it('should initially render visible without any errors', () => {
    expect(mount(SocialSharingPopup, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });

  it('should not be visible if initialVisibility is set to false', function () {
    const wrapper = mount(SocialSharingPopup, {
      propsData: { privacyManagerId: 12345, initialVisibility: false },
    });

    expect(wrapper.find('.social-sharing-popup__container').exists()).toBeFalsy();
  });

  it('should hide the popup on button click ', async () => {
    const wrapper = mount(SocialSharingPopup, {
      propsData: { privacyManagerId: 12345, initialVisibility: true },
    });

    const button = wrapper.find('.social-sharing-popup__button--close');

    button.trigger('click');

    await Vue.nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should open the privacy manager', () => {
    const wrapper = mount(SocialSharingPopup, {
      stubs: { PrivacyManager: privacyManagerStub },
      propsData: { privacyManagerId: 12345, initialVisibility: true },
    });

    wrapper.find('.social-sharing-popup__description > a').trigger('click');

    expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
    expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
  });

  it('should give a consent to the purpose social media and close the popup', async () => {
    const wrapper = mount(SocialSharingPopup, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { privacyManagerId: 12345, initialVisibility: true },
    });

    wrapper.find('.social-sharing-popup__button--accept').trigger('click');

    expect(consentCustomPurpose).toHaveBeenCalledWith(PURPOSE_ID_SOCIAL);

    await Vue.nextTick();
    expect(wrapper.element).toMatchSnapshot();
  });
});
