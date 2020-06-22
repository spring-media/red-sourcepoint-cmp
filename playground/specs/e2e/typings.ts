export interface Fragment {
  root: Selector;
}

export interface EmbedsFragment extends Fragment {
  getAll(): Selector;
  getPlaceholder(embed: Selector): Selector;
  clickPlaceholderLink(placeholder: Selector): TestControllerPromise;
  clickPlaceholderButton(placeholder: Selector): TestControllerPromise;
}

export type PrivacyManagerFragment = Fragment;

export interface MessageFragment extends Fragment {
  settingsButton: Selector;
  acceptAllButton: Selector;
  clickOnSettingsButton: () => TestControllerPromise;
  clickOnAcceptAllButton: () => TestControllerPromise;
}
