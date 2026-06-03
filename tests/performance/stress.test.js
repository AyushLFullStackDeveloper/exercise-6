const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { getAuthToken } = require('../../helpers/authHelper');
const {
  expectWithinThreshold,
  measureRequest,
} = require('../../helpers/performanceHelper');
const { validateSuccessResponse } = require('../../helpers/responseValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');

describe('Performance - Stress', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('keeps repeated protected calls stable under a light stress scenario', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run stress scenario.')
    ) {
      return;
    }

    const token = await getAuthToken();

    for (let index = 0; index < 10; index += 1) {
      const { response, durationMs } = await measureRequest(() =>
        request.get(apiConfig.endpoints.myInstitutesRoles, {
          headers: request.authHeaders(token),
        }),
      );

      validateSuccessResponse(response, 200);
      expectWithinThreshold(durationMs, apiConfig.stressThresholdMs);
    }
  });
});
