import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { EmbedFacebookConsent } from './';
import { sourcepoint } from '../../vuex/sourcepoint';
import { PURPOSE_ID_SOCIAL, VENDOR_ID_FACEBOOK } from '../../../vendor-mapping';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('EmbedFacebookConsent component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setCustomVendorConsents', []);
    store.commit('sourcepoint/setCustomPurposeConsents', []);
  });

  it('should render the placeholder by default', () => {
    const wrapper = mount(EmbedFacebookConsent, {
      propsData: {
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

    const wrapper = mount(EmbedFacebookConsent, {
      propsData: {
        privacyManagerId: 12345,
        content: '<div>Facebook Embed Content</div>',
      },
      store,
      localVue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Facebook Embed Content
        </div>
      </div>
    `);
  });
});
