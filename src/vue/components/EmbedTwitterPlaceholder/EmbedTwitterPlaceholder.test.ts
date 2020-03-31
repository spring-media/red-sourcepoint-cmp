import { mount } from '@vue/test-utils';
import EmbedTwitterPlaceholder from './EmbedTwitterPlaceholder.vue';

describe('EmbedTwitterPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedTwitterPlaceholder).element).toMatchSnapshot();
  });
});
