module.exports = {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['**/*.{js,ts,vue}', '!**/*.stories.js', '!**/*.d.ts'],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text', 'text-summary'],

  coverageDirectory: null,

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'vue'],

  transform: {
    '^.+\\.(vue)$': 'vue-jest',
  },

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.common.js',
  },

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // The root directory that Jest should scan for tests and modules within
  rootDir: './src',

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],

  preset: 'ts-jest',
};
