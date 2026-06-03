const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { validateErrorResponse } = require('../../helpers/responseValidator');
const { validateNoSqlInjectionLeakage } = require('../../helpers/securityValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Security - SQL Injection', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('does not expose SQL internals for injection-style login payloads', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const response = await request.post(apiConfig.endpoints.login, {
      email: "' OR '1'='1",
      password: "' OR '1'='1",
    });

    validateErrorResponse(response, STATUS_CODES.UNAUTHORIZED);
    validateNoSqlInjectionLeakage(response);
  });
});
