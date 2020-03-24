/* eslint-disable @typescript-eslint/no-var-requires */
const Terser = require('terser');
const CleanCSS = require('clean-css');
const { mkdirSync, rmdirSync, existsSync, writeFileSync, readFileSync, copyFileSync } = require('fs');
const { version } = require('../package.json');

const jsFiles = [
  { source: './dist/browser/tcf-v2.js', dest: `.cae/red-cmp-tcf-v2-${version}.min.js` },
  { source: './dist/browser/callbacks.js', dest: `.cae/red-cmp-callbacks-${version}.min.js` },
  { source: './dist/browser/embed-utils.js', dest: `.cae/red-cmp-embed-utils-${version}.min.js` },
];

const htmlFiles = [
  {
    source: './dist/browser/embed-placeholder/EmbedPlaceholder.html',
    dest: `.cae/red-cmp-embed-placeholder-common-${version}.html`,
  },
  {
    source: './dist/browser/embed-placeholder/EmbedPlaceholderFacebook.html',
    dest: `.cae/red-cmp-embed-placeholder-facebook-${version}.html`,
  },
  {
    source: './dist/browser/embed-placeholder/EmbedPlaceholderTwitter.html',
    dest: `.cae/red-cmp-embed-placeholder-twitter-${version}.html`,
  },
  {
    source: './dist/browser/embed-placeholder/EmbedPlaceholderInstagram.html',
    dest: `.cae/red-cmp-embed-placeholder-instagram-${version}.html`,
  },
  {
    source: './dist/browser/embed-placeholder/EmbedPlaceholderYoutube.html',
    dest: `.cae/red-cmp-embed-placeholder-youtube-${version}.html`,
  },
];

existsSync('.cae') && rmdirSync('.cae', { recursive: true });
mkdirSync('.cae');

jsFiles.forEach(({ source, dest }) => {
  const code = readFileSync(source, 'utf8');

  writeFileSync(dest, Terser.minify(code).code, 'utf8');
});

htmlFiles.forEach(({ source, dest }) => copyFileSync(source, dest));

const css = readFileSync('./dist/browser/embed-placeholder/EmbedPlaceholder.css', 'utf8');
writeFileSync(`.cae/red-cmp-embed-placeholder-${version}.min.css`, new CleanCSS().minify(css).styles);

const config = {
  tcfV2: `red-cmp-tcf-v2-${version}.min.js`,
  callbacks: `red-cmp-callbacks-${version}.min.js`,
  embedUtils: `red-cmp-embed-utils-${version}.min.js`,
  embedPlaceholderStyles: `red-cmp-embed-placeholder-${version}.css`,
  embedPlaceholderCommonHtml: `red-cmp-embed-placeholder-common-${version}.html`,
  embedPlaceholderFacebookHtml: `red-cmp-embed-placeholder-facebook-${version}.html`,
  embedPlaceholderInstagramHtml: `red-cmp-embed-placeholder-instagram-${version}.html`,
  embedPlaceholderTwitterHtml: `red-cmp-embed-placeholder-twitter-${version}.html`,
  embedPlaceholderYoutubeHtml: `red-cmp-embed-placeholder-youtube-${version}.html`,
};

writeFileSync(`.cae/red-cmp-config-${version}.json`, JSON.stringify(config));
