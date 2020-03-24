/* eslint-disable @typescript-eslint/no-var-requires */
const { mkdirSync, rmdirSync } = require('fs');
const { copySync } = require('fs-extra');

rmdirSync('./playground/browser/bundles', { recursive: true });
mkdirSync('./playground/browser/bundles', { recursive: true });
copySync('./dist/browser/', './playground/browser/bundles');
