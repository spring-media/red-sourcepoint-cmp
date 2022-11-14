import { mount } from '@vue/test-utils';
import { EmbedYoutubePlaceholder } from './';

describe('EmbedYoutubePlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedYoutubePlaceholder, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
