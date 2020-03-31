import { mount } from '@vue/test-utils';
import EmbedFacebookPlaceholder from './EmbedFacebookPlaceholder.vue';

describe('EmbedFacebookPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedFacebookPlaceholder).element).toMatchSnapshot();
  });
});
