import { mount } from '@vue/test-utils';
import { EmbedPlaceholderFacebook } from './';

describe('EmbedPlaceholderFacebook', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholderFacebook).element).toMatchSnapshot();
  });
});
