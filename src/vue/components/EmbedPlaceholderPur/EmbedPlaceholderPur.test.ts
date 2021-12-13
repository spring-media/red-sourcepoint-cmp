import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { EmbedPurPlaceholder } from '.';

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

const consentVendor = jest.fn();
const consentPurpose = jest.fn();

const consentActionsStub = Vue.extend({
  name: 'ConsentActions',
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$scopedSlots.default!({
        consentVendor,
        consentPurpose,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
  },
});

describe('EmbedPlaceholder', () => {
  afterEach(() => {
    loadPrivacyManagerModal.mockReset();
    consentPurpose.mockReset();
    consentVendor.mockReset();
  });

  it('should render without any errors', () => {
    expect(
      mount(EmbedPurPlaceholder, { propsData: { privacyManagerId: 123, vendorId: 'abc' } }).element,
    ).toMatchSnapshot();
  });

  it('should give a consent to given vendor', () => {
    const wrapper = mount(EmbedPurPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { vendorId: '123', privacyManagerId: 123 },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(consentVendor).toHaveBeenCalledWith('123');
    expect(consentPurpose).not.toHaveBeenCalled();
  });

  it('should give a consent to given purpose', () => {
    const wrapper = mount(EmbedPurPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { purposeId: '123', privacyManagerId: 123 },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(consentPurpose).toHaveBeenCalledWith('123');
    expect(consentVendor).not.toHaveBeenCalled();
  });

  it('should take precedence vendorId over purposeId if both are given', () => {
    const wrapper = mount(EmbedPurPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { vendorId: '123', purposeId: '456', privacyManagerId: 123 },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(consentVendor).toHaveBeenCalledWith('123');
    expect(consentPurpose).not.toHaveBeenCalled();
  });

  it('should not give a consent if vendorId nor purposeId are not given', () => {
    const wrapper = mount(EmbedPurPlaceholder, {
      stubs: { ConsentActions: consentActionsStub },
      propsData: { privacyManagerId: 123 },
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(consentVendor).not.toHaveBeenCalled();
    expect(consentPurpose).not.toHaveBeenCalled();
  });

  it('should open a privacy manager by clicking on the link in the footer', () => {
    const wrapper = mount(EmbedPurPlaceholder, {
      stubs: { PrivacyManager: privacyManagerStub },
      propsData: { privacyManagerId: 12345 },
    });

    wrapper.find('.embed-placeholder__text-link').trigger('click');

    expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
    expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
  });
});
