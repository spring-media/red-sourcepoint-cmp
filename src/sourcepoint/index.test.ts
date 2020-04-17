describe('sourcepoint index', () => {
  it('should export the expected modules', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imports = require('./index');
    const keys = Object.keys(imports);

    expect(keys).toEqual([
      'getIABStubScript',
      'getClientLibraryUrl',
      'customConsentsAreEqual',
      'hasCustomConsent',
      'hasCustomConsentById',
      'customVendorHasConsent',
      'customPurposeHasConsent',
      'loadPrivacyManagerModal',
      'createConfig',
      'getCustomVendorConsents',
      'getCustomVendorConsentsBypassCache',
    ]);
  });
});
