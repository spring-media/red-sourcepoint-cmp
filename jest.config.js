module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json', 'text'],

  // An array of file extensions your modules use
  // moduleFileExtensions: [
  //   "js",
  //   "json",
  //   "jsx",
  //   "ts",
  //   "tsx",
  //   "node"
  // ],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  // moduleNameMapper: {},

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  // modulePathIgnorePatterns: [],

  // The root directory that Jest should scan for tests and modules within
  rootDir: './src',

  // The glob patterns Jest uses to detect test files
  // testMatch: [
  //   "**/__tests__/**/*.[jt]s?(x)",
  //   "**/?(*.)+(spec|test).[tj]s?(x)"
  // ],
};
