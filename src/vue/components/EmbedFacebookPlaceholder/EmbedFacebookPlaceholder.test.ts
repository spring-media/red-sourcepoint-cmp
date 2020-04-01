import { mount } from '@vue/test-utils';
import { EmbedFacebookPlaceholder } from './';

describe('EmbedFacebookPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedFacebookPlaceholder).element).toMatchSnapshot();
  });

  describe('should emit a "requestConsent" event by clicking on', () => {
    it('the "activate consent" button', () => {
      const wrapper = mount(EmbedFacebookPlaceholder);

      wrapper.find('.embed-placeholder__button').trigger('click');

      expect(wrapper.emitted('requestConsent')).toBeTruthy();
    });

    it('the link to the description', () => {
      const wrapper = mount(EmbedFacebookPlaceholder);

      wrapper.find('.embed-placeholder__link-description').trigger('click');

      expect(wrapper.emitted('requestConsent')).toBeTruthy();
    });

    it('the link to the vendor list', () => {
      const wrapper = mount(EmbedFacebookPlaceholder);

      wrapper.find('.embed-placeholder__link-vendor-list').trigger('click');

      expect(wrapper.emitted('requestConsent')).toBeTruthy();
    });
  });
});
