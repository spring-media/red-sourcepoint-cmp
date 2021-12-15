module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [],
  overrides: [
    {
      files: ['*.ts'],
      extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended'],
    },
    {
      files: ['*.vue'],
      extends: ['plugin:vue/strongly-recommended', '@vue/typescript/recommended'],
    },
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'no-shadow': ['error', { hoist: 'all' }],
    'no-loop-func': ['error'],
  },
  settings: {},
};
