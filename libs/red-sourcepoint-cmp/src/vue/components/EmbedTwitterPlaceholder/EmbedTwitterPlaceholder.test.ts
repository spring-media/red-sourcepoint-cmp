import { mount } from '@vue/test-utils';
import { EmbedTwitterPlaceholder } from './';

describe('EmbedTwitterPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedTwitterPlaceholder, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
