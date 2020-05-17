import { SocialSharingPopup } from './SocialSharingPopup';

export default {
  title: 'Social Sharing Popup',
  components: { SocialSharingPopup },
};

export const defaultSocialSharingPopup = () => ({
  components: { SocialSharingPopup },
  template:
    '<social-sharing-popup v-if="isVisible" :privacyManagerId="privacyManagerId" @close="isVisible = false"></social-sharing-popup>',
  data() {
    return {
      isVisible: true,
    };
  },
  props: {
    privacyManagerId: {
      default: 12345,
    },
  },
});
