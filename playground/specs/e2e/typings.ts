export interface EmbedsFragment {
  root: Selector;
}

export interface PrivacyManagerFragment {
  root: Selector;
}

export interface MessageFragment {
  root: Selector;
  settingsButton: Selector;
  acceptAllButton: Selector;
  clickOnSettingsButton: () => TestControllerPromise;
  clickOnAcceptAllButton: () => TestControllerPromise;
}
