import { mount } from '@vue/test-utils';
import ConsentManagement from './ConsentManagement.vue';

describe('ConsentManagement component', () => {
  it('should render the consent slot for a consented vendor', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
        customVendors: [{ _id: '#1234' }],
      },
      slots: {
        onConsent: `<div>Consent</div>`,
      },
    });

    expect(wrapper.text()).toBe('Consent');
  });

  it('should not render the consent slot if the slot is not used', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
        customVendors: [{ _id: '#1234' }],
      },
    });

    expect(wrapper.element).toMatchInlineSnapshot(`<!---->`);
  });

  it('should render the consent slot for a consented purpose', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
        purposeIds: ['#1234'],
        customPurposes: [{ _id: '#1234' }],
      },
      slots: {
        onConsent: `<div>Consent</div>`,
      },
    });

    expect(wrapper.text()).toBe('Consent');
  });

  it('should render the reject slot for a non consented vendor', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
      },
      slots: {
        onReject: `<div>Reject</div>`,
      },
    });

    expect(wrapper.text()).toBe('Reject');
  });

  it('should render the reject slot for a non consented purpose', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
        purposeIds: ['#1234'],
      },
      slots: {
        onReject: `<div>Reject</div>`,
      },
    });

    expect(wrapper.text()).toBe('Reject');
  });

  it('should not render the reject slot for a non consented purpose if no slot is used', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
        purposeIds: ['#1234'],
        customPurposes: [{ _id: '#1234' }],
      },
    });

    expect(wrapper.element).toMatchInlineSnapshot(`<!---->`);
  });
});
