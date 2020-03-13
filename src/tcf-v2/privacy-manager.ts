export const loadPrivacyManagerModal = (managerId: string): void => {
  try {
    window._sp_.loadPrivacyManagerModal(managerId);
  } catch (error) {
    console.error(error);
  }
};
