const { buildRolePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

describe('Roles - Get', () => {
  const roles = createResourceContext('roles');

  beforeAll(roles.beforeAllHook);
  beforeEach(roles.beforeEachHook);
  afterEach(roles.afterEachHook);

  it('gets a role and verifies returned data matches the created record', async () => {
    if (roles.shouldSkip()) {
      return;
    }

    const created = await roles.createTrackedResource(buildRolePayload);
    const response = await roles.getResource(roles.resolveId(created));

    roles.validateSuccessResponse(response, 200);
    expect(roles.resolveId(roles.getResponseData(response))).toBe(roles.resolveId(created));
  });
});
