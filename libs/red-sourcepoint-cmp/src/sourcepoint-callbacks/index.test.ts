describe('sourcepoint-callbacks index', () => {
  it('should export the expected modules', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imports = require('./index');
    const keys = Object.keys(imports);

    expect(keys).toEqual([
      'createCallback',
      'onPrivacyManagerAction',
      'onMessageReady',
      'onConsentReady',
      'onPMCancel',
      'onMessageChoiceSelect',
      'onMessageChoiceError',
    ]);
  });
});
