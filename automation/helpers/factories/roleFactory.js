const { uniqueSuffix } = require('./commonFactory');

const buildRolePayload = (overrides = {}) => ({
  role_name: `API Test Role ${uniqueSuffix()}`,
  description: 'Created by API automation',
  ...overrides,
});

module.exports = {
  buildRolePayload,
};
