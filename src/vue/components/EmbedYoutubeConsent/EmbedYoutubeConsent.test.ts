import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { EmbedYoutubeConsent } from './';
import { sourcepoint } from '../../vuex/sourcepoint';
import { PURPOSE_ID_SOCIAL, VENDOR_ID_YOUTUBE } from '../../../vendor-mapping';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('EmbedYoutubeConsent component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setVendorConsents', []);
    store.commit('sourcepoint/setPurposeConsents', []);
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

  it('should render the embed in case of a consented vendor', () => {
    store.commit('sourcepoint/setVendorConsents', [{ _id: VENDOR_ID_YOUTUBE }]);

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

  it('should render the embed in case of a consented purpose', () => {
    store.commit('sourcepoint/setPurposeConsents', [{ _id: PURPOSE_ID_SOCIAL }]);

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

  it('should load the privacy manager', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window._sp_ = {
      loadPrivacyManagerModal: jest.fn(),
    };

    const wrapper = mount(EmbedYoutubeConsent, {
      propsData: {
        privacyManagerId: 12345,
        content: '<div>Youtube Embed Content</div>',
      },
      store,
      localVue,
    });

    wrapper.find('.embed-placeholder__button').trigger('click');

    expect(window._sp_.loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
  });
});