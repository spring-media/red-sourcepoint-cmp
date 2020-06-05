describe('vue components index', () => {
  it('should export the expected modules', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const imports = require('./index');
    const keys = Object.keys(imports);

    expect(keys).toEqual([
      'ConsentedData',
      'ConsentManagement',
      'ConsentWrapper',
      'EmbedFacebookConsent',
      'EmbedFacebookPlaceholder',
      'EmbedInstagram',
      'EmbedInstagramConsent',
      'EmbedInstagramPlaceholder',
      'EmbedPlaceholder',
      'EmbedTwitterConsent',
      'EmbedTwitterPlaceholder',
      'EmbedYoutubeConsent',
      'EmbedYoutubePlaceholder',
      'PrivacyManager',
      'VendorMapping',
      'SocialSharingPopup',
      'EmbedConsent',
      'EmbedContent',
    ]);
  });
});
