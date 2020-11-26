import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import { EmbedPodigeeConsent } from './';
import { sourcepoint } from '../../vuex/sourcepoint';
import { VENDOR_ID_PODIGEE } from '../../../vendor-mapping';

const localVue = createLocalVue();

localVue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    sourcepoint,
  },
});

describe('EmbedPodigeeConsent component', () => {
  afterEach(() => {
    store.commit('sourcepoint/setGrantedVendors', []);
  });

  it('should render the placeholder by default', () => {
    const wrapper = mount(EmbedPodigeeConsent, {
      propsData: {
        privacyManagerId: 123,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the embed in case of a consented vendor', () => {
    store.commit('sourcepoint/setGrantedVendors', [VENDOR_ID_PODIGEE]);

    const wrapper = mount(EmbedPodigeeConsent, {
      propsData: {
        content: '<div>Podigee Content</div>',
        privacyManagerId: 123,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Podigee Content
        </div>
      </div>
    `);
  });

  it('should provide an embed slot for overriding the default consent content', () => {
    store.commit('sourcepoint/setGrantedVendors', [VENDOR_ID_PODIGEE]);

    const wrapper = mount(EmbedPodigeeConsent, {
      propsData: {
        privacyManagerId: 123,
      },
      slots: {
        embed: '<div>Podigee Embed Content</div>',
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        Podigee Embed Content
      </div>
    `);
  });
});
