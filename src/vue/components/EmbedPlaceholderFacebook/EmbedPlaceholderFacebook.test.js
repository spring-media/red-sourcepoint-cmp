import { mount } from '@vue/test-utils';
import { EmbedPlaceholderFacebook } from './index';

describe('EmbedPlaceholderFacebook', () => {
  it('should render without any errors', () => {
    expect(
      mount(EmbedPlaceholderFacebook, {
        propsData: {
          privacyManagerId: '123456',
        },
      }).element,
    ).toMatchSnapshot();
  });
});
