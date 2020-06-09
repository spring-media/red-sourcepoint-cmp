import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { EmbedConsent } from './';
import { sourcepoint } from '../../vuex/sourcepoint';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('EmbedConsent component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setCustomVendorConsents', []);
    store.commit('sourcepoint/setCustomPurposeConsents', []);
  });

  it('should render the placeholder by default', () => {
    const wrapper = mount(EmbedConsent, {
      propsData: {
        customConsents: {},
        vendorId: 'abc',
        privacyManagerId: 123,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the embed in case of a consented vendor', async () => {
    store.commit('sourcepoint/setCustomVendorConsents', [{ _id: 'abc' }]);

    const wrapper = mount(EmbedConsent, {
      propsData: {
        customConsents: {},
        content: '<div>Embed Content</div>',
        vendorId: 'abc',
        privacyManagerId: 123,
      },
      store,
      localVue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Embed Content
        </div>
      </div>
    `);
  });
});
