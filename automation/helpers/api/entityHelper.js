const request = require('./requestHelper');
const STATUS_CODES = require('../constants/statusCodes');
const {
  getResponseData,
  validateSuccessResponse,
} = require('../validators/responseValidator');

const resolveId = entity =>
  entity?.id ||
  entity?.user_id ||
  entity?.institute_id ||
  entity?.role_id ||
  entity?.mapping_id;

const createEntity = async (endpoint, payload, token = null) => {
  const response = await request.post(endpoint, payload, {
    headers: token ? request.authHeaders(token) : undefined,
  });
  validateSuccessResponse(response, STATUS_CODES.CREATED);

  const entity = getResponseData(response);
  expect(resolveId(entity)).toBeDefined();

  return entity;
};

const deleteEntity = async (endpoint, id, token = null) => {
  if (!endpoint || !id) {
    return null;
  }

  return request.delete(`${endpoint}/${id}`, {
    headers: token ? request.authHeaders(token) : undefined,
  });
};

module.exports = {
  createEntity,
  deleteEntity,
  resolveId,
};
