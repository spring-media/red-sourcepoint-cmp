import { mount } from '@vue/test-utils';
import { EmbedTwitterPlaceholderPur } from '.';

describe('EmbedTwitterPlaceholderPur', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedTwitterPlaceholderPur, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
