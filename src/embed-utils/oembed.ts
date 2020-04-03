export const getScriptSrcFromOembedHTML = (html: string): string | null => {
  const src = html.match(/script async src\s*=\s*"(.+?)"/);

  return src ? src[1] : null;
};
