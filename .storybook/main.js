module.exports = {
  stories: ['../src/vue/**/*.stories.(mdx|js)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-viewport', '@storybook/addon-knobs'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [{
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
      }],
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};
