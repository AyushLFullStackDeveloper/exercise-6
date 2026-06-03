const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { validateErrorResponse } = require('../../helpers/responseValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Security - Malformed Payload', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('rejects malformed JSON with exact bad request status', async () => {
    if (skipIf(!apiAvailable, 'Backend is not reachable.')) {
      return;
    }

    const response = await request.post(apiConfig.endpoints.login, '{"email":', {
      headers: { 'Content-Type': 'application/json' },
      transformRequest: [data => data],
    });

    validateErrorResponse(response, STATUS_CODES.BAD_REQUEST);
  });
});
