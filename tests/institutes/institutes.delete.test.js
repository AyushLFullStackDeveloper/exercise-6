const { buildInstitutePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

describe('Institutes - Delete', () => {
  const institutes = createResourceContext('institutes');

  beforeAll(institutes.beforeAllHook);
  beforeEach(institutes.beforeEachHook);
  afterEach(institutes.afterEachHook);

  it('deletes an institute and verifies it is no longer accessible', async () => {
    if (institutes.shouldSkip()) {
      return;
    }

    const created = await institutes.createTrackedResource(buildInstitutePayload);
    const id = institutes.resolveId(created);

    institutes.validateSuccessResponse(await institutes.deleteResource(id), 200);
    institutes.validateErrorResponse(await institutes.getResource(id), 404);
  });
});
