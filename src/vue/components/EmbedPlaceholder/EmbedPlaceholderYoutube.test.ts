import { mount } from '@vue/test-utils';
import { EmbedPlaceholderYoutube } from './';

describe('EmbedPlaceholderYoutube', () => {
  it('should render without any errors', () => {
    expect(mount(EmbedPlaceholderYoutube).element).toMatchSnapshot();
  });
});
