module.exports = {
  rootDir: '..',
  roots: ['<rootDir>/tests'],
  testMatch: [
    '<rootDir>/tests/auth/**/*.test.js',
    '<rootDir>/tests/users/**/*.test.js',
    '<rootDir>/tests/institutes/**/*.test.js',
    '<rootDir>/tests/roles/**/*.test.js',
    '<rootDir>/tests/mappings/**/*.test.js',
    '<rootDir>/tests/security/**/*.test.js',
    '<rootDir>/tests/performance/**/*.test.js',
  ],
  testTimeout: 120000,
  maxWorkers: 1,
  testEnvironment: 'node',
  reporters: ['default', '<rootDir>/tests/reporters/enterpriseReporter.js'],
  verbose: true,
};
