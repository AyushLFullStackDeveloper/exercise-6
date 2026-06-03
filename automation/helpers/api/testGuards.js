const axios = require('axios');
const apiConfig = require('../../config/apiConfig');
const MESSAGES = require('../constants/messages');
const TEST_CONSTANTS = require('../constants/testConstants');

const skipIf = (condition, reason) => {
  if (!condition) {
    return false;
  }

  console.warn(`Skipping test: ${reason}`);
  return true;
};

const requireEndpoint = (endpoint, name) => {
  return skipIf(!endpoint, MESSAGES.missingEndpoint(name));
};

const isApiReachable = async () => {
  try {
    await axios.get(apiConfig.baseUrl, {
      timeout: TEST_CONSTANTS.apiReachabilityTimeoutMs,
      validateStatus: () => true,
    });
    return true;
  } catch (error) {
    console.warn(`Skipping API tests: backend is not reachable at ${apiConfig.baseUrl}.`);
    return false;
  }
};

module.exports = {
  isApiReachable,
  skipIf,
  requireEndpoint,
};
