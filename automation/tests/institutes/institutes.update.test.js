const { buildInstitutePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

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
      STATUS_CODES.OK,
    );

    const verifyResponse = await institutes.getResource(institutes.resolveId(created));
    institutes.validateSuccessResponse(verifyResponse, STATUS_CODES.OK);
    expect(institutes.getResponseData(verifyResponse).location).toBe(patch.location);
  });
});
