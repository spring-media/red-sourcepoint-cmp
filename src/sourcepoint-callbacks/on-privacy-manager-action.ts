export const onPrivacyManagerAction = (callback: () => void): void => {
  if (typeof window === 'undefined') {
    return;
  }

  window._sp_queue = window._sp_queue || [];
  window._sp_queue.push(function () {
    window._sp_?.addEventListener('onPrivacyManagerAction', callback);
  });
};
