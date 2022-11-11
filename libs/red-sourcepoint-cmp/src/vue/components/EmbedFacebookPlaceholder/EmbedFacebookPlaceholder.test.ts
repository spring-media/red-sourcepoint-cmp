import { mount } from '@vue/test-utils';
import { EmbedFacebookPlaceholder } from './';

describe('EmbedFacebookPlaceholder', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedFacebookPlaceholder, { propsData: { privacyManagerId: 12345 } }).element).toMatchSnapshot();
  });
});
