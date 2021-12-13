import { mount } from '@vue/test-utils';
import { EmbedFacebookPlaceholderPur } from '.';

describe('EmbedFacebookPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedFacebookPlaceholderPur, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
