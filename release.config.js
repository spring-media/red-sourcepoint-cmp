// Release steps

const verifyConditions = [
  [
    '@semantic-release/git',
    {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
    },
  ],
];

const analyzeCommits = [
  [
    '@semantic-release/commit-analyzer',
    {
      preset: 'angular',
      releaseRules: [
        { type: 'docs', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'chore', release: 'minor' },
        { scope: 'no-release', release: false },
      ],
    },
  ],
];

const generateNotes = ['@semantic-release/release-notes-generator'];

const prepare = [
  ['@semantic-release/changelog'],
  ['@semantic-release/npm'],
  [
    '@semantic-release/git',
    {
      assets: ['package.json', 'package-lock.json', 'CHANGELOG.md'],
      message: 'chore(release): bump version ${nextRelease.version}',
    },
  ],
];

const publish = [['@semantic-release/npm'], ['@semantic-release/github']];

// TODO configure following release steps, at the moment skipped
const verifyRelease = [];
const fail = [];
const success = [];

module.exports = {
  repositoryUrl: 'https://github.com/spring-media/red-sourcepoint-cmp.git',
  branches: ['master'],
  verifyConditions,
  analyzeCommits,
  verifyRelease,
  generateNotes,
  prepare,
  publish,
  fail,
  success,
};
