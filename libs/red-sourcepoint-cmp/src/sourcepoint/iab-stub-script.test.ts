import { getIABStubScript } from './iab-stub-script';

describe('sourcepoint getIABStubScript', () => {
  it('should return the expected content', () => {
    expect(getIABStubScript()).toMatchSnapshot();
  });
});
