const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { getAuthToken } = require('../../helpers/authHelper');
const { validateForbiddenResponse } = require('../../helpers/responseValidator');
const { isApiReachable, requireEndpoint, skipIf } = require('../../helpers/testGuards');

describe('Security - Authorization', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('rejects unauthorized role access with exact forbidden status', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run authorization test.') ||
      requireEndpoint(process.env.API_FORBIDDEN_ACCESS_PATH, 'API_FORBIDDEN_ACCESS_PATH')
    ) {
      return;
    }

    const token = await getAuthToken();
    const response = await request.get(process.env.API_FORBIDDEN_ACCESS_PATH, {
      headers: request.authHeaders(token),
    });

    validateForbiddenResponse(response);
  });
});
