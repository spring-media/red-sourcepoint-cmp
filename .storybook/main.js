module.exports = {
  stories: ['../src/vue/**/*.stories.(mdx|js)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-viewport', '@storybook/addon-knobs'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{ loader: require.resolve('ts-loader') }],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
