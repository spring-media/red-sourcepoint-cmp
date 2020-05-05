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

    expect(wrapper.find('.social-sharing-popup__container').exists()).toBeFalsy();
  });

  it('button click should hide the popup', async () => {
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

    wrapper.find('.social-sharing-popup__button--accept').trigger('click');

    expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
    expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
  });
});
