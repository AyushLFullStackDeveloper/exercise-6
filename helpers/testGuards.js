const axios = require('axios');
const apiConfig = require('./apiConfig');

const skipIf = (condition, reason) => {
  if (!condition) {
    return false;
  }

  console.warn(`Skipping test: ${reason}`);
  return true;
};

const requireEndpoint = (endpoint, name) => {
  return skipIf(!endpoint, `Set ${name} endpoint env var to run this contract test.`);
};

const isApiReachable = async () => {
  try {
    await axios.get(apiConfig.baseUrl, {
      timeout: 2000,
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
