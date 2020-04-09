export const loadPrivacyManagerModal = (managerId: number): void => {
  try {
    window._sp_.loadPrivacyManagerModal(managerId);
  } catch (error) {
    console.error(error);
  }
};
