import Vue from 'vue';
import { mount } from '@vue/test-utils';
import { EmbedYoutubePlaceholder } from './';

const loadPrivacyManagerModal = jest.fn();

const privacyManagerStub = Vue.extend({
  name: 'PrivacyManager',
  render() {
    return (
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      this.$scopedSlots.default!({
        loadPrivacyManagerModal,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }) as any
    );
  },
});

describe('EmbedYoutubePlaceholder', () => {
  afterEach(() => {
    loadPrivacyManagerModal.mockReset();
  });

  it('should render without any errors', () => {
    expect(mount(EmbedYoutubePlaceholder, { propsData: { privacyManager: 12345 } }).element).toMatchSnapshot();
  });

  describe('should open a privacy manager by clicking on', () => {
    it.each([
      ['the "activate consent" button', '.embed-placeholder__button'],
      ['the link to the description', '.embed-placeholder__link-description'],
      ['the link to the vendor list', '.embed-placeholder__link-vendor-list'],
    ])('%s', (_, selector) => {
      const wrapper = mount(EmbedYoutubePlaceholder, {
        stubs: { PrivacyManager: privacyManagerStub },
        propsData: { privacyManagerId: 12345 },
      });

      wrapper.find(selector).trigger('click');

      expect(loadPrivacyManagerModal).toHaveBeenCalledWith(12345);
      expect(loadPrivacyManagerModal).toHaveBeenCalledTimes(1);
    });
  });
});
