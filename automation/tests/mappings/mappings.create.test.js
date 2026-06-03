const {
  buildMappingPayload,
  createMappingContext,
  request,
  validateErrorResponse,
  validateSuccessResponse,
} = require('../../helpers/mappingTestHelper');
const apiConfig = require('../../helpers/apiConfig');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Mappings - Create', () => {
  const mappings = createMappingContext();

  beforeAll(mappings.beforeAllHook);
  beforeEach(mappings.beforeEachHook);
  afterEach(mappings.afterEachHook);

  it('creates a user-role-institute mapping', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);

    expect(mapping).toBeDefined();
  });

  it('rejects duplicate mapping creation with exact conflict status', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    await mappings.createMapping(graph);

    const duplicateResponse = await request.post(
      apiConfig.endpoints.mappings,
      buildMappingPayload(graph),
      { headers: request.authHeaders(mappings.getToken()) },
    );

    validateErrorResponse(duplicateResponse, STATUS_CODES.CONFLICT);
  });

  it('rejects missing required mapping fields with exact bad request status', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const response = await request.post(
      apiConfig.endpoints.mappings,
      {},
      { headers: request.authHeaders(mappings.getToken()) },
    );

    validateErrorResponse(response, STATUS_CODES.BAD_REQUEST);
  });
});
