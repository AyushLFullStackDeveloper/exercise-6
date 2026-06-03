const { buildInstitutePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

describe('Institutes - Create', () => {
  const institutes = createResourceContext('institutes');

  beforeAll(institutes.beforeAllHook);
  beforeEach(institutes.beforeEachHook);
  afterEach(institutes.afterEachHook);

  it('creates an institute and verifies a persisted identifier is returned', async () => {
    if (institutes.shouldSkip()) {
      return;
    }

    const created = await institutes.createTrackedResource(buildInstitutePayload);
    expect(institutes.resolveId(created)).toBeDefined();
    expect(created.institute_name || created.name).toBeDefined();
  });
});
