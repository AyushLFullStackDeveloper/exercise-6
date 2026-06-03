const { buildInstitutePayload } = require('../../helpers/dataFactory');
const { createResourceContext } = require('../../helpers/resourceTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Institutes - Get', () => {
  const institutes = createResourceContext('institutes');

  beforeAll(institutes.beforeAllHook);
  beforeEach(institutes.beforeEachHook);
  afterEach(institutes.afterEachHook);

  it('gets an institute and verifies returned data matches the created record', async () => {
    if (institutes.shouldSkip()) {
      return;
    }

    const created = await institutes.createTrackedResource(buildInstitutePayload);
    const response = await institutes.getResource(institutes.resolveId(created));

    institutes.validateSuccessResponse(response, STATUS_CODES.OK);
    expect(institutes.resolveId(institutes.getResponseData(response))).toBe(
      institutes.resolveId(created),
    );
  });
});
