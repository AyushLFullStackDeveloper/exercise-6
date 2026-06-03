const apiConfig = require('../../config/apiConfig');
const request = require('../api/requestHelper');
const MESSAGES = require('../constants/messages');
const { validateLoginResponse, validateProtectedContextResponse } = require('../validators/authValidator');

const requireApiCredentials = () => {
  const { email, password } = apiConfig.credentials;

  if (!email || !password) {
    throw new Error(MESSAGES.missingCredentials);
  }

  return { email, password };
};

const login = async (credentials = requireApiCredentials()) => {
  const response = await request.post(apiConfig.endpoints.login, credentials);
  return validateLoginResponse(response);
};

const getAuthToken = async () => {
  const loginData = await login();
  return loginData.token || loginData.accessToken || loginData.pre_context_token;
};

module.exports = {
  requireApiCredentials,
  validateLoginResponse,
  validateProtectedContextResponse,
  login,
  getAuthToken,
};
