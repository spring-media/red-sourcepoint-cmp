const { initImageSnapshots } = require('@spring-media/storybook-addon-image-snapshots');

const config = () => {
  const getMatchOptions = () => ({
    customSnapshotsDir: '.image-snapshots',
  });

  const getGotoOptions = ({ context: { parameters } }) => {
    const { imageSnapshots = { waitForNetwork: false } } = parameters;

    if (imageSnapshots.waitForNetwork === true) {
      return {
        waitUntil: ['load', 'networkidle2'],
      };
    }

    return {};
  };

  const common = {
    framework: 'vue',
    getMatchOptions,
    getGotoOptions,
  };

  if (process.env.CI !== 'true') {
    return common;
  }

  return {
    storybookUrl: `file:///opt/storybook-static`,
    ...common,
  };
};

initImageSnapshots(config());
