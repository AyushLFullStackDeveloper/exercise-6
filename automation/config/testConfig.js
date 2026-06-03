const TEST_CONSTANTS = require('../helpers/constants/testConstants');

module.exports = {
  jestTimeoutMs: TEST_CONSTANTS.jestTimeoutMs,
  maxWorkers: TEST_CONSTANTS.maxWorkers,
  reports: {
    htmlDir: 'automation/reports/html',
    junitDir: 'automation/reports/junit',
    logsDir: 'automation/reports/logs',
    summariesDir: 'automation/reports/summaries',
  },
};
