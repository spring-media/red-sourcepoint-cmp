import { mount } from '@vue/test-utils';
import { EmbedPlaceholderTwitter } from './';

describe('EmbedPlaceholderTwitter', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholderTwitter).element).toMatchSnapshot();
  });
});
