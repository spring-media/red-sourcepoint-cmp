import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { EmbedTwitterConsent } from './';
import { sourcepoint } from '../../vuex/sourcepoint';
import { VENDOR_ID_TWITTER } from '../../../vendor-mapping';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('EmbedTwitterConsent component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setGrantedVendors', []);
  });

  it('should render the placeholder by default', () => {
    const wrapper = mount(EmbedTwitterConsent, {
      propsData: {
        privacyManagerId: 12345,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the embed in case of a consented vendor and consented purpose(s)', async () => {
    store.commit('sourcepoint/setGrantedVendors', [VENDOR_ID_TWITTER]);

    const wrapper = mount(EmbedTwitterConsent, {
      propsData: {
        privacyManagerId: 12345,
        content: '<div>Twitter Embed Content</div>',
      },
      store,
      localVue,
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Twitter Embed Content
        </div>
      </div>
    `);
  });
});
