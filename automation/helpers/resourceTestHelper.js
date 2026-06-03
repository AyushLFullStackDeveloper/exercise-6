const apiConfig = require('../config/apiConfig');
const request = require('./api/requestHelper');
const { getAuthToken } = require('./auth/authHelper');
const CleanupRegistry = require('./cleanup/cleanupHelper');
const {
  createEntity,
  resolveId,
} = require('./api/entityHelper');
const {
  getResponseData,
  validateErrorResponse,
  validateSuccessResponse,
} = require('./validators/responseValidator');
const { isApiReachable, requireEndpoint, skipIf } = require('./api/testGuards');
const MESSAGES = require('./constants/messages');

const resourceConfigs = {
  users: {
    type: 'user',
    endpoint: () => apiConfig.endpoints.users,
    envName: 'API_USERS_PATH',
  },
  institutes: {
    type: 'institute',
    endpoint: () => apiConfig.endpoints.institutes,
    envName: 'API_INSTITUTES_PATH',
  },
  roles: {
    type: 'role',
    endpoint: () => apiConfig.endpoints.roles,
    envName: 'API_ROLES_PATH',
  },
};

const createResourceContext = resourceName => {
  const config = resourceConfigs[resourceName];
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
      skipIf(!apiConfig.credentials.email, `Set API_TEST_EMAIL to run ${resourceName} contracts.`) ||
      requireEndpoint(config.endpoint(), config.envName)
    );
  };

  const createTrackedResource = async buildPayload => {
    return cleanup.add(
      config.type,
      await createEntity(config.endpoint(), buildPayload(), token),
    );
  };

  const getResource = id => {
    return request.get(`${config.endpoint()}/${id}`, {
      headers: request.authHeaders(token),
    });
  };

  const updateResource = (id, payload) => {
    return request.patch(`${config.endpoint()}/${id}`, payload, {
      headers: request.authHeaders(token),
    });
  };

  const deleteResource = id => {
    return request.delete(`${config.endpoint()}/${id}`, {
      headers: request.authHeaders(token),
    });
  };

  return {
    beforeAllHook,
    beforeEachHook,
    afterEachHook,
    shouldSkip,
    createTrackedResource,
    getResource,
    updateResource,
    deleteResource,
    getResponseData,
    resolveId,
    validateErrorResponse,
    validateSuccessResponse,
  };
};

module.exports = {
  createResourceContext,
};
