const STATUS_CODES = require('../constants/statusCodes');
const { responseSchemas, validateResponseSchema } = require('./schemaValidator');

const expectExactStatus = (response, expectedStatus) => {
  expect(response.status).toBe(expectedStatus);
};

const expectResponseObject = response => {
  expect(response).toBeDefined();
  expect(response.data).toBeDefined();
  expect(typeof response.data).toBe('object');
};

const hasOwn = (payload, key) => Object.prototype.hasOwnProperty.call(payload, key);

const validateSuccessResponse = (response, expectedStatus = STATUS_CODES.OK) => {
  expectExactStatus(response, expectedStatus);
  expectResponseObject(response);
  validateResponseSchema(response.data, responseSchemas.success);

  if (hasOwn(response.data, 'success')) {
    expect(response.data.success).toBe(true);
  }

  return response.data;
};

const validateErrorResponse = (response, expectedStatus) => {
  expectExactStatus(response, expectedStatus);
  expectResponseObject(response);
  validateResponseSchema(response.data, responseSchemas.error);

  if (hasOwn(response.data, 'success')) {
    expect(response.data.success).toBe(false);
  }

  return response.data;
};

const validateUnauthorizedResponse = response =>
  validateErrorResponse(response, STATUS_CODES.UNAUTHORIZED);

const validateForbiddenResponse = response =>
  validateErrorResponse(response, STATUS_CODES.FORBIDDEN);

const validatePaginationResponse = data => {
  validateResponseSchema(data, responseSchemas.pagination);
  const pagination = data.pagination || data.meta?.pagination || data.meta;

  expect(pagination).toEqual(expect.any(Object));
  expect(pagination.page ?? pagination.currentPage).toEqual(expect.any(Number));
  expect(pagination.limit ?? pagination.pageSize).toEqual(expect.any(Number));
  expect(pagination.total ?? pagination.totalItems).toEqual(expect.any(Number));
};

const validateCollectionResponse = data => {
  const collection = Array.isArray(data)
    ? data
    : data.data || data.items || data.results;

  expect(Array.isArray(collection)).toBe(true);
  return collection;
};

const validateErrorStructure = data => validateResponseSchema(data, responseSchemas.error);

const validateSuccessStructure = data => {
  expect(data).toEqual(expect.any(Object));

  if (hasOwn(data, 'success')) {
    expect(typeof data.success).toBe('boolean');
  }

  if (hasOwn(data, 'message')) {
    expect(typeof data.message).toBe('string');
  }
};

const getResponseData = response => response.data?.data || response.data;

module.exports = {
  expectExactStatus,
  validateSuccessResponse,
  validateErrorResponse,
  validateUnauthorizedResponse,
  validateForbiddenResponse,
  validatePaginationResponse,
  validateCollectionResponse,
  validateErrorStructure,
  validateSuccessStructure,
  getResponseData,
};
