import { mount } from '@vue/test-utils';
import { EmbedInstagramPlaceholder } from './';

describe('EmbedInstagramPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedInstagramPlaceholder, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
