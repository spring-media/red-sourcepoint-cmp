import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { EmbedYoutubeConsent } from './';
import { sourcepoint } from '../../vuex/sourcepoint';
import { VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('EmbedYoutubeConsent component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setGrantedVendors', []);
  });

  it('should render the placeholder by default', () => {
    const wrapper = mount(EmbedYoutubeConsent, {
      propsData: {
        privacyManagerId: 12345,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the embed in case of a consented vendor and his purpose(s)', () => {
    store.commit('sourcepoint/setGrantedVendors', [VENDOR_ID_YOUTUBE]);

    const wrapper = mount(EmbedYoutubeConsent, {
      propsData: {
        privacyManagerId: 12345,
        content: '<div>Youtube Embed Content</div>',
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Youtube Embed Content
        </div>
      </div>
    `);
  });
});
