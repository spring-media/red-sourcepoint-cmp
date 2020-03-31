import { mount } from '@vue/test-utils';
import EmbedInstagramPlaceholder from './EmbedInstagramPlaceholder.vue';

describe('EmbedPlaceholderInstagram', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedInstagramPlaceholder).element).toMatchSnapshot();
  });
});
