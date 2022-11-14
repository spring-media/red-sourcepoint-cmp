const sonarqubeScanner = require('sonarqube-scanner');
const { version } = require('./package.json');

sonarqubeScanner(
  {
    serverUrl: 'https://sonarcloud.io',
    options: {
      'sonar.host.url': 'https://sonarcloud.io',
      'sonar.organization': 'spring-media',
      'sonar.projectKey': 'spring-media_red-sourcepoint-cmp',
      'sonar.projectName': 'Red Sourcepoint CMP',
      'sonar.projectVersion': version,
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.test.inclusions': 'src/**/*.test.ts',
      'sonar.coverage.exclusions': '**/*.js, playground/**/*.ts',
      'sonar.sourceEncoding': 'UTF-8',
      'sonar.login': process.env.SONAR_TOKEN,
    },
  },
  () => process.exit(),
);
