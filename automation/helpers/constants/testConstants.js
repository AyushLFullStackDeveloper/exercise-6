const TEST_CONSTANTS = {
  defaultTimeoutMs: Number(process.env.API_TIMEOUT_MS || 10000),
  apiReachabilityTimeoutMs: Number(process.env.API_REACHABILITY_TIMEOUT_MS || 2000),
  performanceThresholdMs: Number(process.env.API_PERFORMANCE_THRESHOLD_MS || 2000),
  stressThresholdMs: Number(process.env.API_STRESS_THRESHOLD_MS || 5000),
  jestTimeoutMs: Number(process.env.API_JEST_TIMEOUT_MS || 120000),
  maxWorkers: Number(process.env.API_JEST_MAX_WORKERS || 1),
  loginConcurrentRequestCount: Number(process.env.API_LOGIN_CONCURRENT_REQUEST_COUNT || 5),
  concurrentRequestCount: Number(process.env.API_CONCURRENT_REQUEST_COUNT || 10),
  stressRequestCount: Number(process.env.API_STRESS_REQUEST_COUNT || 10),
  defaultPassword: 'ApiTest@12345',
  invalidCredentials: {
    email: 'invalid.api.user@example.com',
    password: 'definitely-wrong-password',
  },
  sampleLocation: 'Automation City',
  sampleInstituteType: 'College',
};

module.exports = TEST_CONSTANTS;
