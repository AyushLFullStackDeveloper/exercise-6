const apiConfig = require('../config/apiConfig');
const request = require('./api/requestHelper');
const CleanupRegistry = require('./cleanup/cleanupHelper');
const { getAuthToken } = require('./auth/authHelper');
const {
  createEntity,
  createTestGraph,
  resolveId,
} = require('./dataFactory');
const { buildMappingPayload } = require('./factories/mappingFactory');
const {
  getResponseData,
  validateErrorResponse,
  validateSuccessResponse,
} = require('./validators/responseValidator');
const { isApiReachable, requireEndpoint, skipIf } = require('./api/testGuards');
const MESSAGES = require('./constants/messages');

const createMappingContext = () => {
  let apiAvailable;
  let token;
  let cleanup;

  const beforeAllHook = async () => {
    apiAvailable = await isApiReachable();
    if (apiAvailable && apiConfig.credentials.email) {
      token = await getAuthToken();
    }
  };

  const beforeEachHook = () => {
    cleanup = new CleanupRegistry();
  };

  const afterEachHook = async () => {
    await cleanup.cleanup(token);
  };

  const shouldSkip = () => {
    return (
      skipIf(!apiAvailable, MESSAGES.backendUnavailable) ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run mapping contracts.') ||
      requireEndpoint(apiConfig.endpoints.users, 'API_USERS_PATH') ||
      requireEndpoint(apiConfig.endpoints.institutes, 'API_INSTITUTES_PATH') ||
      requireEndpoint(apiConfig.endpoints.roles, 'API_ROLES_PATH') ||
      requireEndpoint(apiConfig.endpoints.mappings, 'API_MAPPINGS_PATH')
    );
  };

  const createGraph = async () => {
    const graph = await createTestGraph();
    cleanup.add('user', graph.user);
    cleanup.add('institute', graph.institute);
    cleanup.add('role', graph.role);
    return graph;
  };

  const createMapping = async graph => {
    const mapping = await createEntity(
      apiConfig.endpoints.mappings,
      buildMappingPayload(graph),
      token,
    );
    cleanup.add('mapping', mapping);
    return mapping;
  };

  const getMapping = id => {
    return request.get(`${apiConfig.endpoints.mappings}/${id}`, {
      headers: request.authHeaders(token),
    });
  };

  const updateMapping = (id, payload) => {
    return request.patch(`${apiConfig.endpoints.mappings}/${id}`, payload, {
      headers: request.authHeaders(token),
    });
  };

  const deleteMapping = id => {
    return request.delete(`${apiConfig.endpoints.mappings}/${id}`, {
      headers: request.authHeaders(token),
    });
  };

  return {
    beforeAllHook,
    beforeEachHook,
    afterEachHook,
    shouldSkip,
    createGraph,
    createMapping,
    getMapping,
    updateMapping,
    deleteMapping,
    getToken: () => token,
  };
};

module.exports = {
  buildMappingPayload,
  createMappingContext,
  getResponseData,
  request,
  resolveId,
  validateErrorResponse,
  validateSuccessResponse,
};
