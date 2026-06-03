const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { getAuthToken } = require('../../helpers/authHelper');
const { validateUnauthorizedResponse } = require('../../helpers/responseValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');

describe('Security - JWT', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('rejects missing JWT with exact unauthorized status', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const response = await request.get(apiConfig.endpoints.myInstitutesRoles);
    validateUnauthorizedResponse(response);
  });

  it('rejects invalid JWT with exact unauthorized status', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const response = await request.get(apiConfig.endpoints.myInstitutesRoles, {
      headers: request.authHeaders('not-a-valid-jwt'),
    });

    validateUnauthorizedResponse(response);
  });

  it('rejects tampered JWT with exact unauthorized status', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run JWT tampering test.')
    ) {
      return;
    }

    const token = await getAuthToken();
    const tamperedToken = `${token.slice(0, -4)}abcd`;
    const response = await request.get(apiConfig.endpoints.myInstitutesRoles, {
      headers: request.authHeaders(tamperedToken),
    });

    validateUnauthorizedResponse(response);
  });

  it('rejects expired JWT with exact unauthorized status', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const expiredToken = process.env.API_EXPIRED_JWT || [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      'eyJzdWIiOiJhcGktdGVzdCIsImV4cCI6MX0',
      'expired-signature',
    ].join('.');

    const response = await request.get(apiConfig.endpoints.myInstitutesRoles, {
      headers: request.authHeaders(expiredToken),
    });

    validateUnauthorizedResponse(response);
  });
});
