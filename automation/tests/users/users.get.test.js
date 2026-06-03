const { buildUserPayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Users - Get', () => {
  const users = createResourceContext('users');

  beforeAll(users.beforeAllHook);
  beforeEach(users.beforeEachHook);
  afterEach(users.afterEachHook);

  it('gets a user and verifies returned data matches the created record', async () => {
    if (users.shouldSkip()) {
      return;
    }

    const created = await users.createTrackedResource(buildUserPayload);
    const response = await users.getResource(users.resolveId(created));

    users.validateSuccessResponse(response, STATUS_CODES.OK);
    expect(users.resolveId(users.getResponseData(response))).toBe(users.resolveId(created));
  });
});
