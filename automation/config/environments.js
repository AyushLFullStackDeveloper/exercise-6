const ENVIRONMENTS = {
  local: {
    name: 'local',
    baseUrl: 'http://localhost:5001',
  },
  development: {
    name: 'development',
    baseUrl: 'http://localhost:5001',
  },
  staging: {
    name: 'staging',
    baseUrl: 'http://localhost:5001',
  },
  production: {
    name: 'production',
    baseUrl: 'http://localhost:5001',
  },
};

const activeEnvironmentName = process.env.API_ENV || process.env.NODE_ENV || 'local';
const activeEnvironment = ENVIRONMENTS[activeEnvironmentName] || ENVIRONMENTS.local;

module.exports = {
  ENVIRONMENTS,
  activeEnvironmentName,
  activeEnvironment,
};
