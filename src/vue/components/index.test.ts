import { readdirSync, lstatSync } from 'fs';

describe('vue components index', () => {
  it('should export the expected modules', () => {
    const directories = readdirSync('./src/vue/components').filter((file) => {
      return lstatSync(`./src/vue/components/${file}`).isDirectory();
    });

    expect(directories).toEqual([
      'ConsentActions',
      'ConsentManagement',
      'ConsentWrapper',
      'ConsentedData',
      'EmbedConsent',
      'EmbedContent',
      'EmbedFacebookConsent',
      'EmbedFacebookPlaceholder',
      'EmbedInstagram',
      'EmbedInstagramConsent',
      'EmbedInstagramPlaceholder',
      'EmbedPlaceholder',
      'EmbedSocialNetworksConsent',
      'EmbedSocialNetworksPlaceholder',
      'EmbedTwitterConsent',
      'EmbedTwitterPlaceholder',
      'EmbedYoutubeConsent',
      'EmbedYoutubePlaceholder',
      'PrivacyManager',
      'SocialSharingPopup',
      'VendorMapping',
    ]);
  });
});
