import { mount } from '@vue/test-utils';
import EmbedYoutubePlaceholder from './EmbedYoutubePlaceholder.vue';

describe('EmbedYoutubePlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedYoutubePlaceholder).element).toMatchSnapshot();
  });
});
