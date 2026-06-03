const apiConfig = require('./apiConfig');
const request = require('./requestHelper');
const { validateSuccessResponse } = require('./responseValidator');

const requireApiCredentials = () => {
  const { email, password } = apiConfig.credentials;

  if (!email || !password) {
    throw new Error('Set API_TEST_EMAIL and API_TEST_PASSWORD to run authenticated API tests.');
  }

  return { email, password };
};

const validateLoginResponse = response => {
  const body = validateSuccessResponse(response, 200);
  const data = body.data || body;

  expect(data.token || data.accessToken || data.pre_context_token).toBeDefined();
  expect(data.user).toEqual(expect.any(Object));
  expect(data.user.email || data.user.id).toBeDefined();

  return data;
};

const validateProtectedContextResponse = response => {
  const body = validateSuccessResponse(response, 200);
  const context = body.data || body;

  expect(Array.isArray(context)).toBe(true);

  context.forEach(institute => {
    expect(institute.institute_id || institute.id).toBeDefined();
    expect(institute.institute_name || institute.name).toBeDefined();
    expect(Array.isArray(institute.roles || [])).toBe(true);
  });

  return context;
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
