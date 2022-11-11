import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ConsentWrapper from './ConsentWrapper.vue';
import { sourcepoint } from '../../vuex/sourcepoint';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('ConsentWrapper component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setGrantedVendors', []);
  });

  it('should render the disabledContent slot for a non consented vendor', () => {
    const wrapper = mount(ConsentWrapper, {
      propsData: {
        vendorId: '#1234',
      },
      slots: {
        disabledContent: `<div>Reject</div>`,
      },
      store,
      localVue,
    });

    expect(wrapper.text()).toBe('Reject');
  });

  it('should not render the disabledContent slot if the slot is not used', () => {
    const wrapper = mount(ConsentWrapper, {
      propsData: {
        vendorId: '1234',
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchInlineSnapshot(`<!---->`);
  });

  it('should render the enabledContent slot for a consented vendor', () => {
    store.commit('sourcepoint/setGrantedVendors', ['1234']);

    const wrapper = mount(ConsentWrapper, {
      propsData: {
        vendorId: '1234',
      },
      slots: {
        enabledContent: `<div>Consent</div>`,
      },
      store,
      localVue,
    });

    expect(wrapper.text()).toBe('Consent');
  });

  it('should not render the enabledContent slot if the slot is not used', () => {
    store.commit('sourcepoint/setGrantedVendors', ['1234']);

    const wrapper = mount(ConsentWrapper, {
      propsData: {
        vendorId: '1234',
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchInlineSnapshot(`<!---->`);
  });
});
