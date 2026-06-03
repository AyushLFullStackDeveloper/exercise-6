const testConfig = require('./testConfig');

module.exports = {
  rootDir: '../..',
  testTimeout: testConfig.jestTimeoutMs,
  maxWorkers: testConfig.maxWorkers,
  verbose: true,
};
