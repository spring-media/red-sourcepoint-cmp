export type PlaygroundParams = {
  accountId: number;
  propertyId: number;
  mmsDomain: string;
  wrapperAPIOrigin: string;
  libraryURL: string;
  privacyManagerId: number;
  host: string;
};

interface CustomSupportObject extends CodeceptJS.SupportObject {
  I: CodeceptJS.Playwright & CodeceptJS.I;
  playgroundParams: PlaygroundParams;
}

export interface PageFragment {
  readonly root: CodeceptJS.LocatorOrString;
}

export interface SourcepointMessageFragment extends PageFragment {
  readonly settingsButton: CodeceptJS.LocatorOrString;
  readonly acceptButton: CodeceptJS.LocatorOrString;
  openSettings(): void;
  acceptAll(): void;
}
