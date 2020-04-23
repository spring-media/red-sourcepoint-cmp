describe('embed-utils index', () => {
  it('should export the expected modules', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imports = require('./index');
    const keys = Object.keys(imports);

    expect(keys).toEqual(['instagram', 'twitter', 'iframely', 'getScriptSrcFromOembedHTML', 'loadScript']);
  });
});