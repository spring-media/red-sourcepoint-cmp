import { mount } from '@vue/test-utils';
import { EmbedPlaceholderTwitter } from './index';

describe('EmbedPlaceholderTwitter', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholderTwitter).element).toMatchSnapshot();
  });
});
