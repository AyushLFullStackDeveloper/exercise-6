const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { getAuthToken } = require('../../helpers/authHelper');
const {
  expectWithinThreshold,
  measureRequest,
} = require('../../helpers/performanceHelper');
const { validateSuccessResponse } = require('../../helpers/responseValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');

describe('Performance - Response Time', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('validates protected context API response time', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run response-time test.')
    ) {
      return;
    }

    const token = await getAuthToken();
    const { response, durationMs } = await measureRequest(() =>
      request.get(apiConfig.endpoints.myInstitutesRoles, {
        headers: request.authHeaders(token),
      }),
    );

    validateSuccessResponse(response, 200);
    expectWithinThreshold(durationMs, apiConfig.performanceThresholdMs);
  });
});
