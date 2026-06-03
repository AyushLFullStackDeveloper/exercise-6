const apiConfig = require('../config/apiConfig');
const { getAuthToken } = require('./authHelper');
const { createEntity, deleteEntity, resolveId } = require('./api/entityHelper');
const { uniqueSuffix } = require('./factories/commonFactory');
const { buildUserPayload } = require('./factories/userFactory');
const { buildInstitutePayload } = require('./factories/instituteFactory');
const { buildRolePayload } = require('./factories/roleFactory');

const createTestGraph = async () => {
  const token = await getAuthToken();
  const user = await createEntity(apiConfig.endpoints.users, buildUserPayload(), token);
  const institute = await createEntity(
    apiConfig.endpoints.institutes,
    buildInstitutePayload(),
    token,
  );
  const role = await createEntity(apiConfig.endpoints.roles, buildRolePayload(), token);

  return { token, user, institute, role };
};

module.exports = {
  uniqueSuffix,
  buildUserPayload,
  buildInstitutePayload,
  buildRolePayload,
  resolveId,
  createEntity,
  deleteEntity,
  createTestGraph,
};
