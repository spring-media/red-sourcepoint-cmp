describe('src/index', () => {
  it('should export expected modules', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const modules = require('./index');

    expect(Object.keys(modules)).toMatchSnapshot();
  });
});
