const { buildUserPayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

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

    users.validateSuccessResponse(response, 200);
    expect(users.resolveId(users.getResponseData(response))).toBe(users.resolveId(created));
  });
});
