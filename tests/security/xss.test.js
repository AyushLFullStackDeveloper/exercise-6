const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { validateErrorResponse } = require('../../helpers/responseValidator');
const { validateNoXssReflection } = require('../../helpers/securityValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');

describe('Security - XSS', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('does not reflect XSS payloads in login errors', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const payload = '<script>alert("api-test")</script>';
    const response = await request.post(apiConfig.endpoints.login, {
      email: payload,
      password: payload,
    });

    validateErrorResponse(response, 401);
    validateNoXssReflection(response, payload);
  });
});
