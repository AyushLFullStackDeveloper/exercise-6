const { buildRolePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

describe('Roles - Update', () => {
  const roles = createResourceContext('roles');

  beforeAll(roles.beforeAllHook);
  beforeEach(roles.beforeEachHook);
  afterEach(roles.afterEachHook);

  it('updates a role and verifies updated values persist', async () => {
    if (roles.shouldSkip()) {
      return;
    }

    const created = await roles.createTrackedResource(buildRolePayload);
    const patch = { description: `Updated role ${Date.now()}` };

    roles.validateSuccessResponse(
      await roles.updateResource(roles.resolveId(created), patch),
      200,
    );

    const verifyResponse = await roles.getResource(roles.resolveId(created));
    roles.validateSuccessResponse(verifyResponse, 200);
    expect(roles.getResponseData(verifyResponse).description).toBe(patch.description);
  });
});
