const {
  buildMappingPayload,
  createMappingContext,
  getResponseData,
  resolveId,
  validateErrorResponse,
  validateSuccessResponse,
} = require('../../helpers/mappingTestHelper');
const STATUS_CODES = require('../../helpers/constants/statusCodes');

describe('Mappings - Update', () => {
  const mappings = createMappingContext();

  beforeAll(mappings.beforeAllHook);
  beforeEach(mappings.beforeEachHook);
  afterEach(mappings.afterEachHook);

  it('updates a mapping and verifies updated values persist', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const newGraph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);
    const mappingId = resolveId(mapping);
    const patch = { role_id: resolveId(newGraph.role) };

    validateSuccessResponse(await mappings.updateMapping(mappingId, patch), STATUS_CODES.OK);

    const verifyResponse = await mappings.getMapping(mappingId);
    validateSuccessResponse(verifyResponse, STATUS_CODES.OK);
    expect(getResponseData(verifyResponse).role_id).toBe(patch.role_id);
  });

  it('rejects invalid user ID with exact bad request status', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);
    const response = await mappings.updateMapping(resolveId(mapping), {
      ...buildMappingPayload(graph),
      user_id: 'invalid-user-id',
    });

    validateErrorResponse(response, STATUS_CODES.BAD_REQUEST);
  });

  it('rejects invalid role ID with exact bad request status', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);
    const response = await mappings.updateMapping(resolveId(mapping), {
      ...buildMappingPayload(graph),
      role_id: 'invalid-role-id',
    });

    validateErrorResponse(response, STATUS_CODES.BAD_REQUEST);
  });

  it('rejects invalid institute ID with exact bad request status', async () => {
    if (mappings.shouldSkip()) {
      return;
    }

    const graph = await mappings.createGraph();
    const mapping = await mappings.createMapping(graph);
    const response = await mappings.updateMapping(resolveId(mapping), {
      ...buildMappingPayload(graph),
      institute_id: 'invalid-institute-id',
    });

    validateErrorResponse(response, STATUS_CODES.BAD_REQUEST);
  });
});
