const {
  createMappingContext,
  getResponseData,
  resolveId,
  validateSuccessResponse,
} = require('../../helpers/mappingTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Mappings - Get', () => {
  const mappings = createMappingContext();

  beforeAll(mappings.beforeAllHook);
  beforeEach(mappings.beforeEachHook);
  afterEach(mappings.afterEachHook);

  it('gets a mapping and verifies returned data matches the created record', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);
    const mappingId = resolveId(mapping);
    const readResponse = await mappings.getMapping(mappingId);

    validateSuccessResponse(readResponse, STATUS_CODES.OK);
    expect(resolveId(getResponseData(readResponse))).toBe(mappingId);
  });
});
