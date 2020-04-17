describe('tcf-v2 index', () => {
  it('should export the expected modules', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imports = require('./index');
    const keys = Object.keys(imports);

    expect(keys).toEqual(['getTCData', 'addEventListener', 'removeEventListener', 'ping']);
  });
});
