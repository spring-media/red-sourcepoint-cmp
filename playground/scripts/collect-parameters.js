const prompts = require('prompts');
const chalk = require('chalk');
const { existsSync } = require('fs');
const { parse } = require('url');

const collectParameters = async () => {
  const onSubmit = ({ name }, answer) => {
    if (name !== 'host') {
      return;
    }

    const { hostname, protocol } = parse(answer);

    if (hostname !== 'localhost') {
      console.log(`
${chalk.yellow('Make sure your hosts file contains an entry for')} ${protocol}//${hostname}
`);
    }
  };

  const defaults = {
    accountId: 75,
    propertyId: null,
    mmsDomain: 'https://message75.sp-prod.net',
    wrapperAPIOrigin: 'https://wrapper-api.sp-prod.net/tcfv2',
    libraryURL: 'https://gdpr-tcfv2.sp-prod.net/wrapperMessagingWithoutDetection.js',
    privacyManagerId: null,
    host: 'http://localhost:5000',
  };

  let parameters = {};
  if (existsSync('./playground/public/build/parameters.json')) {
    parameters = require('../public/build/parameters.json');
  }

  const initials = { ...defaults, ...parameters };

  return prompts(
    [
      {
        type: 'number',
        name: 'accountId',
        message: 'Account ID',
        initial: initials.accountId,
      },
      {
        type: 'number',
        name: 'propertyId',
        message: 'Property ID',
        initial: initials.propertyId,
      },
      {
        type: 'text',
        name: 'mmsDomain',
        message: 'MMS Domain',
        initial: initials.mmsDomain,
      },
      {
        type: 'text',
        name: 'wrapperAPIOrigin',
        message: 'Wrapper API Origin',
        initial: initials.wrapperAPIOrigin,
      },
      {
        type: 'text',
        name: 'libraryURL',
        message: 'Library URL',
        initial: initials.libraryURL,
      },
      {
        type: 'number',
        name: 'privacyManagerId',
        message: 'Privacy Manager ID',
        initial: initials.privacyManagerId,
      },
      {
        type: 'text',
        name: 'host',
        message: 'Host',
        initial: initials.host,
        validate: (value) => {
          const { port } = parse(value);

          if (!port) {
            return `${value} must contain a port`;
          }

          return true;
        },
      },
    ],
    {
      onSubmit,
    },
  );
};

module.exports = {
  collectParameters,
};
