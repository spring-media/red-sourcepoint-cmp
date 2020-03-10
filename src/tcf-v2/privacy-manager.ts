declare namespace _sp_ {
    function loadPrivacyManagerModal(managerId: string): void;
}

export const loadPrivacyManagerModal = (managerId: string): void => {
    try {
        _sp_.loadPrivacyManagerModal(managerId);
    } catch (error) {
        console.error(error);
    }
};
