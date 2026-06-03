const { buildUserPayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Users - Delete', () => {
  const users = createResourceContext('users');

  beforeAll(users.beforeAllHook);
  beforeEach(users.beforeEachHook);
  afterEach(users.afterEachHook);

  it('deletes a user and verifies it is no longer accessible', async () => {
    if (users.shouldSkip()) {
      return;
    }

    const created = await users.createTrackedResource(buildUserPayload);
    const id = users.resolveId(created);

    users.validateSuccessResponse(await users.deleteResource(id), STATUS_CODES.OK);
    users.validateErrorResponse(await users.getResource(id), STATUS_CODES.NOT_FOUND);
  });
});
