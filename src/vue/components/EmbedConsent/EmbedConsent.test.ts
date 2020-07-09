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
    store.commit('sourcepoint/setGrantedVendors', []);
  });

  it('should render the placeholder by default', () => {
    const wrapper = mount(EmbedConsent, {
      propsData: {
        vendorId: 'abc',
        privacyManagerId: 123,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render the embed in case of a consented vendor', () => {
    store.commit('sourcepoint/setGrantedVendors', ['abc']);

    const wrapper = mount(EmbedConsent, {
      propsData: {
        content: '<div>Embed Content</div>',
        vendorId: 'abc',
        privacyManagerId: 123,
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        <div>
          Embed Content
        </div>
      </div>
    `);
  });

  it('should provide an embed slot for overriding the default consent content', () => {
    store.commit('sourcepoint/setGrantedVendors', ['abc']);

    const wrapper = mount(EmbedConsent, {
      propsData: {
        vendorId: 'abc',
        privacyManagerId: 123,
      },
      slots: {
        embed: '<div>Custom Embed Content</div>',
      },
      store,
      localVue,
    });

    expect(wrapper.element).toMatchInlineSnapshot(`
      <div>
        Custom Embed Content
      </div>
    `);
  });
});
