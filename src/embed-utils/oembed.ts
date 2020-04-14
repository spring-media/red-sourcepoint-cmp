export const getScriptSrcFromOembedHTML = (html: string, fallback: string): string => {
  const src = html.match(/script async src\s*=\s*["'](.+?)["']/);

  return src ? src[1].trim() : fallback;
};
