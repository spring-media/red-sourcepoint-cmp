export const loadPrivacyManagerModal = (managerId: number, section?: string): void => {
  try {
    window._sp_?.loadPrivacyManagerModal(managerId, section);
  } catch (error) {
    console.error(error);
  }
};
