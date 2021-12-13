import { mount } from '@vue/test-utils';
import { EmbedYoutubePlaceholderPur } from '.';

describe('EmbedYoutubePlaceholderPur', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedYoutubePlaceholderPur, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
