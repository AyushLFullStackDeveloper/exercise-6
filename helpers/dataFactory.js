const apiConfig = require('./apiConfig');
const request = require('./requestHelper');
const { getAuthToken } = require('./authHelper');
const {
  getResponseData,
  validateSuccessResponse,
} = require('./responseValidator');

const uniqueSuffix = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const buildUserPayload = () => ({
  full_name: `API Test User ${uniqueSuffix()}`,
  email: `api.test.${uniqueSuffix()}@example.com`,
  password: 'ApiTest@12345',
});

const buildInstitutePayload = () => ({
  institute_name: `API Test Institute ${uniqueSuffix()}`,
  location: 'Automation City',
  institute_type: 'College',
});

const buildRolePayload = () => ({
  role_name: `API Test Role ${uniqueSuffix()}`,
  description: 'Created by API automation',
});

const resolveId = entity =>
  entity?.id ||
  entity?.user_id ||
  entity?.institute_id ||
  entity?.role_id ||
  entity?.mapping_id;

const createEntity = async (endpoint, payload, token = null) => {
  const response = await request.post(endpoint, payload, {
    headers: token ? request.authHeaders(token) : undefined,
  });
  validateSuccessResponse(response, 201);

  const entity = getResponseData(response);
  expect(resolveId(entity)).toBeDefined();

  return entity;
};

const deleteEntity = async (endpoint, id, token = null) => {
  if (!endpoint || !id) {
    return null;
  }

  return request.delete(`${endpoint}/${id}`, {
    headers: token ? request.authHeaders(token) : undefined,
  });
};

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
