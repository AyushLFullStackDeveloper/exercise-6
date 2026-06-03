const expectExactStatus = (response, expectedStatus) => {
  expect(response.status).toBe(expectedStatus);
};

const expectResponseObject = response => {
  expect(response).toBeDefined();
  expect(response.data).toBeDefined();
  expect(typeof response.data).toBe('object');
};

const validateSuccessResponse = (response, expectedStatus = 200) => {
  expectExactStatus(response, expectedStatus);
  expectResponseObject(response);

  if (Object.prototype.hasOwnProperty.call(response.data, 'success')) {
    expect(response.data.success).toBe(true);
  }

  return response.data;
};

const validateErrorResponse = (response, expectedStatus) => {
  expectExactStatus(response, expectedStatus);
  expectResponseObject(response);

  if (Object.prototype.hasOwnProperty.call(response.data, 'success')) {
    expect(response.data.success).toBe(false);
  }

  expect(
    response.data.message || response.data.error || response.data.errors,
  ).toBeDefined();

  return response.data;
};

const validateUnauthorizedResponse = response => validateErrorResponse(response, 401);

const validateForbiddenResponse = response => validateErrorResponse(response, 403);

const validatePaginationResponse = data => {
  expect(data).toEqual(expect.any(Object));
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

const validateErrorStructure = data => {
  expect(data).toEqual(expect.any(Object));
  expect(data.message || data.error || data.errors).toBeDefined();
};

const validateSuccessStructure = data => {
  expect(data).toEqual(expect.any(Object));

  if (Object.prototype.hasOwnProperty.call(data, 'success')) {
    expect(typeof data.success).toBe('boolean');
  }

  if (Object.prototype.hasOwnProperty.call(data, 'message')) {
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
