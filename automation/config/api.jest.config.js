const baseConfig = require('./jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/automation/tests'],
  testMatch: [
    '<rootDir>/automation/tests/auth/**/*.test.js',
    '<rootDir>/automation/tests/users/**/*.test.js',
    '<rootDir>/automation/tests/institutes/**/*.test.js',
    '<rootDir>/automation/tests/roles/**/*.test.js',
    '<rootDir>/automation/tests/mappings/**/*.test.js',
    '<rootDir>/automation/tests/security/**/*.test.js',
    '<rootDir>/automation/tests/performance/**/*.test.js',
  ],
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/automation/setup/testSetup.js'],
  globalSetup: '<rootDir>/automation/setup/globalSetup.js',
  globalTeardown: '<rootDir>/automation/setup/globalTeardown.js',
  reporters: ['default', '<rootDir>/automation/tests/reporters/enterpriseReporter.js'],
};
