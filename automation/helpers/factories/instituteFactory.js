const TEST_CONSTANTS = require('../constants/testConstants');
const { uniqueSuffix } = require('./commonFactory');

const buildInstitutePayload = (overrides = {}) => ({
  institute_name: `API Test Institute ${uniqueSuffix()}`,
  location: TEST_CONSTANTS.sampleLocation,
  institute_type: TEST_CONSTANTS.sampleInstituteType,
  ...overrides,
});

module.exports = {
  buildInstitutePayload,
};
