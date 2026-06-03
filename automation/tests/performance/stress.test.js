const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { getAuthToken } = require('../../helpers/authHelper');
const {
  expectWithinThreshold,
  measureRequest,
} = require('../../helpers/performanceHelper');
const { validateSuccessResponse } = require('../../helpers/responseValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');
const STATUS_CODES = require('../../helpers/constants/statusCodes');
const TEST_CONSTANTS = require('../../helpers/constants/testConstants');

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

    for (let index = 0; index < TEST_CONSTANTS.stressRequestCount; index += 1) {
      const { response, durationMs } = await measureRequest(() =>
        request.get(apiConfig.endpoints.myInstitutesRoles, {
          headers: request.authHeaders(token),
        }),
      );

      validateSuccessResponse(response, STATUS_CODES.OK);
      expectWithinThreshold(durationMs, apiConfig.stressThresholdMs);
    }
  });
});
