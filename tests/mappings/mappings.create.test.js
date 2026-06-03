const {
  buildMappingPayload,
  createMappingContext,
  request,
  validateErrorResponse,
  validateSuccessResponse,
} = require('../../helpers/mappingTestHelper');

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
      require('../../helpers/apiConfig').endpoints.mappings,
      buildMappingPayload(graph),
      { headers: request.authHeaders(mappings.getToken()) },
    );

    validateErrorResponse(duplicateResponse, 409);
  });

  it('rejects missing required mapping fields with exact bad request status', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const response = await request.post(
      require('../../helpers/apiConfig').endpoints.mappings,
      {},
      { headers: request.authHeaders(mappings.getToken()) },
    );

    validateErrorResponse(response, 400);
  });
});
