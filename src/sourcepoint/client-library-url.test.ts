import { getClientLibraryUrl } from './client-library-url';

describe('sourcepoint getClientLibraryUrl', () => {
  it('should return the expected content', () => {
    expect(getClientLibraryUrl()).toMatchSnapshot();
  });
});
