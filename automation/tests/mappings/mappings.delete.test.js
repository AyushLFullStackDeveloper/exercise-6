const apiConfig = require('../../helpers/apiConfig');
const {
  buildMappingPayload,
  createMappingContext,
  request,
  resolveId,
  validateErrorResponse,
  validateSuccessResponse,
} = require('../../helpers/mappingTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Mappings - Delete', () => {
  const mappings = createMappingContext();

  beforeAll(mappings.beforeAllHook);
  beforeEach(mappings.beforeEachHook);
  afterEach(mappings.afterEachHook);

  it('does not return a mapping after deletion', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);
    const mappingId = resolveId(mapping);

    validateSuccessResponse(await mappings.deleteMapping(mappingId), STATUS_CODES.OK);
    validateErrorResponse(await mappings.getMapping(mappingId), STATUS_CODES.NOT_FOUND);
  });

  it('rejects mapping attempts for deleted entities with exact not found status', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const deletedUserId = resolveId(graph.user);

    await request.delete(`${apiConfig.endpoints.users}/${deletedUserId}`, {
      headers: request.authHeaders(mappings.getToken()),
    });

    const response = await request.post(
      apiConfig.endpoints.mappings,
      buildMappingPayload(graph),
      { headers: request.authHeaders(mappings.getToken()) },
    );

    validateErrorResponse(response, STATUS_CODES.NOT_FOUND);
  });

  it('prevents orphan mapping scenarios after parent entity deletion', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);

    await request.delete(`${apiConfig.endpoints.roles}/${resolveId(graph.role)}`, {
      headers: request.authHeaders(mappings.getToken()),
    });

    validateErrorResponse(await mappings.getMapping(resolveId(mapping)), STATUS_CODES.NOT_FOUND);
  });
});
