const { buildRolePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

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
      STATUS_CODES.OK,
    );

    const verifyResponse = await roles.getResource(roles.resolveId(created));
    roles.validateSuccessResponse(verifyResponse, STATUS_CODES.OK);
    expect(roles.getResponseData(verifyResponse).description).toBe(patch.description);
  });
});
