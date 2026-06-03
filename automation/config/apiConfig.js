const { activeEnvironment, activeEnvironmentName } = require('./environments');
const ENDPOINTS = require('../helpers/constants/endpoints');
const TEST_CONSTANTS = require('../helpers/constants/testConstants');

const apiConfig = {
  environment: activeEnvironmentName,
  baseUrl: process.env.API_BASE_URL || activeEnvironment.baseUrl,
  timeoutMs: TEST_CONSTANTS.defaultTimeoutMs,
  performanceThresholdMs: TEST_CONSTANTS.performanceThresholdMs,
  stressThresholdMs: TEST_CONSTANTS.stressThresholdMs,
  credentials: {
    email: process.env.API_TEST_EMAIL,
    password: process.env.API_TEST_PASSWORD,
  },
  endpoints: {
    login: ENDPOINTS.auth.login,
    myInstitutesRoles: ENDPOINTS.auth.myInstitutesRoles,
    users: ENDPOINTS.users,
    institutes: ENDPOINTS.institutes,
    roles: ENDPOINTS.roles,
    mappings: ENDPOINTS.mappings,
  },
};

module.exports = apiConfig;
