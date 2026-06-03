const { buildInstitutePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');

describe('Institutes - Update', () => {
  const institutes = createResourceContext('institutes');

  beforeAll(institutes.beforeAllHook);
  beforeEach(institutes.beforeEachHook);
  afterEach(institutes.afterEachHook);

  it('updates an institute and verifies updated values persist', async () => {
    if (institutes.shouldSkip()) {
      return;
    }

    const created = await institutes.createTrackedResource(buildInstitutePayload);
    const patch = { location: `Updated City ${Date.now()}` };

    institutes.validateSuccessResponse(
      await institutes.updateResource(institutes.resolveId(created), patch),
      200,
    );

    const verifyResponse = await institutes.getResource(institutes.resolveId(created));
    institutes.validateSuccessResponse(verifyResponse, 200);
    expect(institutes.getResponseData(verifyResponse).location).toBe(patch.location);
  });
});
