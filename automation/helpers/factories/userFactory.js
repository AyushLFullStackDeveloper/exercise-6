const TEST_CONSTANTS = require('../constants/testConstants');
const { uniqueSuffix } = require('./commonFactory');

const buildUserPayload = (overrides = {}) => ({
  full_name: `API Test User ${uniqueSuffix()}`,
  email: `api.test.${uniqueSuffix()}@example.com`,
  password: TEST_CONSTANTS.defaultPassword,
  ...overrides,
});

module.exports = {
  buildUserPayload,
};
