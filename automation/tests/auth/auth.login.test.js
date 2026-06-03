const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { requireApiCredentials, validateLoginResponse } = require('../../helpers/authHelper');
const { validateErrorResponse } = require('../../helpers/responseValidator');
const { validateSensitiveFields } = require('../../helpers/securityValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');
const STATUS_CODES = require('../../helpers/constants/statusCodes');
const TEST_CONSTANTS = require('../../helpers/constants/testConstants');

describe('Auth - Login', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('logs in with valid credentials and returns token plus user context fields', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run login contract.')
    ) {
      return;
    }

    const response = await request.post(apiConfig.endpoints.login, requireApiCredentials());
    const data = validateLoginResponse(response);

    expect(data.user.email || data.user.id).toBeDefined();
    validateSensitiveFields(response.data);
  });

  it('rejects invalid credentials with exact unauthorized status', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const response = await request.post(
      apiConfig.endpoints.login,
      TEST_CONSTANTS.invalidCredentials,
    );

    validateErrorResponse(response, STATUS_CODES.UNAUTHORIZED);
  });
});
