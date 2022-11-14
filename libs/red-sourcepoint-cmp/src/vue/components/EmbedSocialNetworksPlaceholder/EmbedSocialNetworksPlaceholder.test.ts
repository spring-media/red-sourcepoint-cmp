import { mount } from '@vue/test-utils';
import { EmbedSocialNetworksPlaceholder } from './';

describe('EmbedSocialNetworksPlaceholder', () => {
  it('should render without any errors', () => {
    expect(
      mount(EmbedSocialNetworksPlaceholder, { propsData: { privacyManagerId: 12345, vendorId: 'abc' } }).element,
    ).toMatchSnapshot();
  });
});
