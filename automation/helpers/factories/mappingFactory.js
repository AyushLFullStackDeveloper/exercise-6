const { resolveId } = require('../api/entityHelper');

const buildMappingPayload = ({ user, institute, role }, overrides = {}) => ({
  user_id: resolveId(user),
  institute_id: resolveId(institute),
  role_id: resolveId(role),
  ...overrides,
});

module.exports = {
  buildMappingPayload,
};
