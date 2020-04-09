export type UnregisterCallback = () => boolean;
export type OnConsentReadyCallback = () => void;
export type OnMessageReadyCallback = () => void;
export type onPMCancelCallback = () => void;
export type OnMessageChoiceSelectCallback = () => void;
export type OnMessageChoiceErrorCallback = () => void;

export type OnPrivacyManagerActionCallback = (action: string) => void;

export type OptionalCallbacks = {
  onPrivacyManagerAction?: OnPrivacyManagerActionCallback;
  onMessageReady?: OnMessageReadyCallback;
  onMessageChoiceSelect?: OnMessageChoiceSelectCallback;
  onMessageChoiceError?: OnMessageChoiceErrorCallback;
  onConsentReady?: OnConsentReadyCallback;
  onPMCancel?: onPMCancelCallback;
};

export type OptionalCallbackKeys = keyof OptionalCallbacks;
