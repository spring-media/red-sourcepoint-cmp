import { mount } from '@vue/test-utils';
import { EmbedPlaceholderFacebook } from './index';

describe('EmbedPlaceholderFacebook', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholderFacebook).element).toMatchSnapshot();
  });
});
