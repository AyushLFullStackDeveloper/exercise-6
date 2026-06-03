const { buildRolePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

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

    roles.validateSuccessResponse(await roles.deleteResource(id), 200);
    roles.validateErrorResponse(await roles.getResource(id), 404);
  });
});
