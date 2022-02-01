import { mount } from '@vue/test-utils';
import { EmbedPodigeePlaceholderPur } from './';

describe('EmbedPodigeePlaceholderPur', () => {
  it('should render without any errors', () => {
    expect(
      mount(EmbedPodigeePlaceholderPur, {
        propsData: { privacyManagerId: 12345, privacyManagerIdDenyTracking: 67891, vendorId: 'abc' },
      }).element,
    ).toMatchSnapshot();
  });
});
