// eslint-disable-next-line @typescript-eslint/no-var-requires
const { initImageSnapshots } = require('@spring-media/storybook-addon-image-snapshots');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const config = () => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getMatchOptions = () => ({
    customSnapshotsDir: '.image-snapshots',
  });

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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
