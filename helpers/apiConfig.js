const DEFAULT_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5001';

const apiConfig = {
  baseUrl: DEFAULT_BASE_URL,
  timeoutMs: Number(process.env.API_TIMEOUT_MS || 10000),
  performanceThresholdMs: Number(process.env.API_PERFORMANCE_THRESHOLD_MS || 2000),
  stressThresholdMs: Number(process.env.API_STRESS_THRESHOLD_MS || 5000),
  credentials: {
    email: process.env.API_TEST_EMAIL,
    password: process.env.API_TEST_PASSWORD,
  },
  endpoints: {
    login: process.env.API_LOGIN_PATH || '/auth/login',
    myInstitutesRoles:
      process.env.API_MY_INSTITUTES_ROLES_PATH || '/auth/my-institutes-roles',
    users: process.env.API_USERS_PATH,
    institutes: process.env.API_INSTITUTES_PATH,
    roles: process.env.API_ROLES_PATH,
    mappings: process.env.API_MAPPINGS_PATH,
  },
};

module.exports = apiConfig;
