const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { validateUnauthorizedResponse } = require('../../helpers/responseValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');

describe('Auth - Middleware', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('rejects missing JWT for protected context endpoint with exact unauthorized status', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const response = await request.get(apiConfig.endpoints.myInstitutesRoles);
    validateUnauthorizedResponse(response);
  });
});
