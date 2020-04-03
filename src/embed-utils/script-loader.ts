export const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');

    script.async = true;
    script.onload = (): void => resolve();
    script.src = src;
    script.onerror = reject;

    document.head.append(script);
  });
};
