const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { getAuthToken, requireApiCredentials } = require('../../helpers/authHelper');
const {
  expectWithinThreshold,
  runConcurrent,
} = require('../../helpers/performanceHelper');
const { validateSuccessResponse } = require('../../helpers/responseValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');

describe('Performance - Concurrent Requests', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('handles concurrent login requests within the response-time threshold', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run login performance test.')
    ) {
      return;
    }

    const results = await runConcurrent(
      () => request.post(apiConfig.endpoints.login, requireApiCredentials()),
      5,
    );

    results.forEach(({ response, durationMs }) => {
      validateSuccessResponse(response, 200);
      expectWithinThreshold(durationMs, apiConfig.performanceThresholdMs);
    });
  });

  it('handles concurrent protected context requests without server errors', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run protected performance test.')
    ) {
      return;
    }

    const token = await getAuthToken();
    const results = await runConcurrent(
      () =>
        request.get(apiConfig.endpoints.myInstitutesRoles, {
          headers: request.authHeaders(token),
        }),
      10,
    );

    results.forEach(({ response, durationMs }) => {
      validateSuccessResponse(response, 200);
      expectWithinThreshold(durationMs, apiConfig.performanceThresholdMs);
    });
  });
});
