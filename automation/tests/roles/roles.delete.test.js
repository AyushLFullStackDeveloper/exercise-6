const { buildRolePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Roles - Delete', () => {
  const roles = createResourceContext('roles');

  beforeAll(roles.beforeAllHook);
  beforeEach(roles.beforeEachHook);
  afterEach(roles.afterEachHook);

  it('deletes a role and verifies it is no longer accessible', async () => {
    if (roles.shouldSkip()) {
      return;
    }

    const created = await roles.createTrackedResource(buildRolePayload);
    const id = roles.resolveId(created);

    roles.validateSuccessResponse(await roles.deleteResource(id), STATUS_CODES.OK);
    roles.validateErrorResponse(await roles.getResource(id), STATUS_CODES.NOT_FOUND);
  });
});
