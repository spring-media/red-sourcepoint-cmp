import { mount } from '@vue/test-utils';
import { EmbedPodigeePlaceholder } from './';

describe('EmbedPodigeePlaceholder', () => {
  it('should render without any errors', () => {
    expect(
      mount(EmbedPodigeePlaceholder, { propsData: { privacyManagerId: 12345, vendorId: 'abc' } }).element,
    ).toMatchSnapshot();
  });
});
