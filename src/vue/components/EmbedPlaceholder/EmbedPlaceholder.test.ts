import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { EmbedPlaceholder } from './';

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
    expect(
      mount(EmbedPlaceholder, { propsData: { customConsents: {}, privacyManagerId: 123 } }).element,
    ).toMatchSnapshot();
  });

  it('should give a consent to given custom consents', () => {
    const customConsents = {};

    const wrapper = mount(EmbedPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { customConsents, privacyManagerId: 123 },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(customConsent).toHaveBeenCalledWith(customConsents);
  });

  it('should open a privacy manager by clicking on the link in the footer', () => {
    const wrapper = mount(EmbedPlaceholder, {
      stubs: { PrivacyManager: privacyManagerStub },
      propsData: { privacyManagerId: 12345, customConsents: {} },
    });

    wrapper.find('.embed-placeholder__text-link').trigger('click');

    expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
    expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
  });
});
