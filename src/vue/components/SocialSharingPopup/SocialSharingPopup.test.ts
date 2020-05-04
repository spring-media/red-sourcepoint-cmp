import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { SocialSharingPopup } from './';

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

describe('SocialSharingPopup', () => {
  afterEach(() => {
    loadPrivacyManagerModal.mockReset();
  });

  it('should initially render visible without any errors', () => {
    expect(mount(SocialSharingPopup, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });

  it('should be not visible if initialVisibility is set to false', function () {
    const wrapper = mount(SocialSharingPopup, {
      propsData: { privacyManagerId: 12345, initialVisibility: false },
    });

    expect(wrapper.isVisible()).toBe(false);
  });

  it('should call the toggleVisibility method on close button', function () {
    const wrapper = mount(SocialSharingPopup, {
      propsData: { privacyManagerId: 12345, initialVisibility: true },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (wrapper.vm as any).toggleVisibility = jest.fn();
    wrapper.find('.social-sharing-popup__button--close').trigger('click');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((wrapper.vm as any).toggleVisibility).toHaveBeenCalledTimes(1);
  });

  it('should open the privacy manager', () => {
    const wrapper = mount(SocialSharingPopup, {
      stubs: { PrivacyManager: privacyManagerStub },
      propsData: { privacyManagerId: 12345, initialVisibility: true },
    });

    wrapper.find('.social-sharing-popup__button--accept').trigger('click');

    expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
    expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
  });
});
