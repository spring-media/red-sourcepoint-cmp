export const loadPrivacyManagerModal = (managerId: string | number): void => {
  try {
    window._sp_.loadPrivacyManagerModal(managerId);
  } catch (error) {
    console.error(error);
  }
};
