import { mount } from '@vue/test-utils';
import { EmbedInstagramPlaceholderPur } from '.';

describe('EmbedInstagramPlaceholderPur', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedInstagramPlaceholderPur, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
