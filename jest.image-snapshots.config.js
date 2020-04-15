module.exports = {
  rootDir: '.',
  clearMocks: true,
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  moduleNameMapper: {},
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.mdx$': '@storybook/addon-docs/jest-transform-mdx',
    '\\.(vue)$': 'jest-transform-stub',
  },
  testMatch: ['<rootDir>/image-snapshots.runner.js'],
  preset: 'ts-jest',
};
