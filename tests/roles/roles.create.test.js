const { buildRolePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

describe('Roles - Create', () => {
  const roles = createResourceContext('roles');

  beforeAll(roles.beforeAllHook);
  beforeEach(roles.beforeEachHook);
  afterEach(roles.afterEachHook);

  it('creates a role and verifies a persisted identifier is returned', async () => {
    if (roles.shouldSkip()) {
      return;
    }

    const created = await roles.createTrackedResource(buildRolePayload);
    expect(roles.resolveId(created)).toBeDefined();
    expect(created.role_name || created.name).toBeDefined();
  });
});
