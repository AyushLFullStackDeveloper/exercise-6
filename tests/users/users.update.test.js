const { buildUserPayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

describe('Users - Update', () => {
  const users = createResourceContext('users');

  beforeAll(users.beforeAllHook);
  beforeEach(users.beforeEachHook);
  afterEach(users.afterEachHook);

  it('updates a user and verifies updated values persist', async () => {
    if (users.shouldSkip()) {
      return;
    }

    const created = await users.createTrackedResource(buildUserPayload);
    const patch = { full_name: `Updated API User ${Date.now()}` };

    users.validateSuccessResponse(
      await users.updateResource(users.resolveId(created), patch),
      200,
    );

    const verifyResponse = await users.getResource(users.resolveId(created));
    users.validateSuccessResponse(verifyResponse, 200);
    expect(users.getResponseData(verifyResponse).full_name).toBe(patch.full_name);
  });
});
