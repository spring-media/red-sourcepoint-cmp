import { mount } from '@vue/test-utils';
import { EmbedPlaceholderInstagram } from './index';

describe('EmbedPlaceholderInstagram', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholderInstagram).element).toMatchSnapshot();
  });
});
