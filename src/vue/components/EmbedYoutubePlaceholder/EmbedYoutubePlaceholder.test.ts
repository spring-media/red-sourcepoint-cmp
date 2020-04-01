import { mount } from '@vue/test-utils';
import { EmbedYoutubePlaceholder } from './';

describe('EmbedYoutubePlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedYoutubePlaceholder).element).toMatchSnapshot();
  });

  describe('should emit a "requestConsent" event by clicking on', () => {
    it('the "activate consent" button', () => {
      const wrapper = mount(EmbedYoutubePlaceholder);

      wrapper.find('.embed-placeholder__button').trigger('click');

      expect(wrapper.emitted('requestConsent')).toBeTruthy();
    });

    it('the link to the description', () => {
      const wrapper = mount(EmbedYoutubePlaceholder);

      wrapper.find('.embed-placeholder__link-description').trigger('click');

      expect(wrapper.emitted('requestConsent')).toBeTruthy();
    });

    it('the link to the vendor list', () => {
      const wrapper = mount(EmbedYoutubePlaceholder);

      wrapper.find('.embed-placeholder__link-vendor-list').trigger('click');

      expect(wrapper.emitted('requestConsent')).toBeTruthy();
    });
  });
});
