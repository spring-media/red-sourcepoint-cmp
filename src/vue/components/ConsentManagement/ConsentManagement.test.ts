import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ConsentManagement from './ConsentManagement.vue';
import { sourcepoint } from '../../vuex/sourcepoint';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('CmpConsents component', () => {
  it('should render the consent slot for a consented vendor', () => {
    const store = new Vuex.Store({
      modules: {
        sourcepoint,
      },
    });

    store.commit('sourcepoint/consentVendor', { _id: '#1234' });

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

  it('should render the consent slot for a consented purpose', () => {
    const store = new Vuex.Store({
      modules: {
        sourcepoint,
      },
    });

    store.commit('sourcepoint/consentPurpose', { _id: '#1234' });

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
    const store = new Vuex.Store({
      modules: {
        sourcepoint,
      },
    });

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
    const store = new Vuex.Store({
      modules: {
        sourcepoint,
      },
    });

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
});
