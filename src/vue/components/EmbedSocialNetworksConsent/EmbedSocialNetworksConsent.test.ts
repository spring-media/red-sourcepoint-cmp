import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { EmbedSocialNetworksConsent } from './';
import { sourcepoint } from '../../vuex/sourcepoint';
import { PURPOSE_ID_SOCIAL, VENDOR_ID_FACEBOOK } from '../../../vendor-mapping';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('EmbedSocialNetworksConsent component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setCustomVendorConsents', []);
    store.commit('sourcepoint/setCustomPurposeConsents', []);
  });

  it('should render the placeholder by default', () => {
    const wrapper = mount(EmbedSocialNetworksConsent, {
      propsData: {
        vendorId: 'abc',
        privacyManagerId: 12345,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the embed in case of a consented vendor and his purpose(s)', async () => {
    store.commit('sourcepoint/setCustomVendorConsents', [{ _id: VENDOR_ID_FACEBOOK }]);
    store.commit('sourcepoint/setCustomPurposeConsents', [{ _id: PURPOSE_ID_SOCIAL }]);

    const wrapper = mount(EmbedSocialNetworksConsent, {
      propsData: {
        vendorId: VENDOR_ID_FACEBOOK,
        privacyManagerId: 12345,
        content: '<div>Social Network Embed Content</div>',
      },
      store,
      localVue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Social Network Embed Content
        </div>
      </div>
    `);
  });
});
