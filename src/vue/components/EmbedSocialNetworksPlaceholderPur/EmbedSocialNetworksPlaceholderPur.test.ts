import { mount } from '@vue/test-utils';
import { EmbedSocialNetworksPlaceholderPur } from '.';

describe('EmbedSocialNetworksPlaceholder', () => {
  it('should render without any errors', () => {
    expect(
      mount(EmbedSocialNetworksPlaceholderPur, { propsData: { privacyManagerId: 12345, vendorId: 'abc' } }).element,
    ).toMatchSnapshot();
  });
});
