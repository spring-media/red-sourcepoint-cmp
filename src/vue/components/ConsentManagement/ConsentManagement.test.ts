import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ConsentManagement from './ConsentManagement.vue';
import { sourcepoint } from '../../vuex/sourcepoint';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('CmpConsents component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setVendorConsents', []);
    store.commit('sourcepoint/setPurposeConsents', []);
  });

  it('should render the consent slot for a consented vendor', () => {
    store.commit('sourcepoint/setVendorConsents', [{ _id: '#1234' }]);

    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
      },
      slots: {
        onConsent: `<div>Consent</div>`,
      },
      localVue,
      store,
    });

    expect(wrapper.text()).toBe('Consent');
  });

  it('should not render the consent slot if the slot is not used', () => {
    store.commit('sourcepoint/setVendorConsents', [{ _id: '#1234' }]);

    const wrapper = mount(ConsentManagement, {
      propsData: {
        vendorId: '#1234',
      },
      localVue,
      store,
    });

    expect(wrapper.isEmpty()).toBe(true);
  });

  it('should render the consent slot for a consented purpose', () => {
    store.commit('sourcepoint/setPurposeConsents', [{ _id: '#1234' }]);

    const wrapper = mount(ConsentManagement, {
      propsData: {
        purposeIds: ['#1234'],
      },
      slots: {
        onConsent: `<div>Consent</div>`,
      },
      localVue,
      store,
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
      localVue,
      store,
    });

    expect(wrapper.text()).toBe('Reject');
  });

  it('should render the reject slot for a non consented purpose', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        purposeIds: ['#1234'],
      },
      slots: {
        onReject: `<div>Reject</div>`,
      },
      localVue,
      store,
    });

    expect(wrapper.text()).toBe('Reject');
  });

  it('should not render the reject slot for a non consented purpose if no slot is used', () => {
    const wrapper = mount(ConsentManagement, {
      propsData: {
        purposeIds: ['#1234'],
      },
      localVue,
      store,
    });

    expect(wrapper.isEmpty()).toBe(true);
  });

  it('should render the reject slot if the prop purposeIds is not set', () => {
    const wrapper = mount(ConsentManagement, {
      slots: {
        onReject: `<div>Reject</div>`,
      },
      localVue,
      store,
    });

    expect(wrapper.text()).toBe('Reject');
  });
});
