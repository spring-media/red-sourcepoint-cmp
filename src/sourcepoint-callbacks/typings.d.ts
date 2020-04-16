export type UnregisterCallback = () => boolean;

export type OnConsentReadyCallback = () => void;
export type OnMessageReadyCallback = () => void;
export type OnPMCancelCallback = () => void;
export type OnMessageChoiceSelectCallback = (choiceId: number, choiceTypeId: number) => void;
export type OnMessageChoiceErrorCallback = (error: Error) => void;
export type OnPrivacyManagerActionCallback = (action: string) => void;

export type OptionalCallbacks = {
  onPrivacyManagerAction?: OnPrivacyManagerActionCallback;
  onMessageReady?: OnMessageReadyCallback;
  onMessageChoiceSelect?: OnMessageChoiceSelectCallback;
  onMessageChoiceError?: OnMessageChoiceErrorCallback;
  onConsentReady?: OnConsentReadyCallback;
  onPMCancel?: OnPMCancelCallback;
};

export type OptionalCallbackKeys = keyof OptionalCallbacks;
