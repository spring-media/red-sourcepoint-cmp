const prompts = require('prompts');

const collectParameters = async () => {
  const onSubmit = ({ name }, answer) => {
    if (name !== 'host') {
      return;
    }

    const { hostname } = new URL(answer);

    if (hostname !== 'localhost') {
      console.log(`Make sure your hosts file contains an entry for ${answer}`);
    }
  };

  return prompts(
    [
      {
        type: 'number',
        name: 'accountId',
        message: 'Account ID',
        initial: 75,
      },
      {
        type: 'number',
        name: 'propertyId',
        message: 'Property ID',
        initial: 6867,
      },
      {
        type: 'text',
        name: 'mmsDomain',
        message: 'MMS Domain',
        initial: 'https://message75.sp-prod.net',
      },
      {
        type: 'text',
        name: 'wrapperAPIOrigin',
        message: 'Wrapper API Origin',
        initial: 'https://wrapper-api.sp-prod.net/tcfv2',
      },
      {
        type: 'number',
        name: 'privacyManagerId',
        message: 'Privacy Manager ID',
        initial: 114406,
      },
      {
        type: 'text',
        name: 'libraryURL',
        message: 'Library URL',
        initial: 'https://gdpr-tcfv2.sp-prod.net/wrapperMessagingWithoutDetection.js',
      },
      {
        type: 'text',
        name: 'host',
        message: '(Local)Host',
        initial: 'http://localhost:5000',
      },
      {
        type: 'confirm',
        name: 'serve',
        message: 'Start Playground',
        initial: true,
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
