const STATUS_CODES = require('../constants/statusCodes');
const { validateSuccessResponse } = require('./responseValidator');
const { responseSchemas, validateResponseSchema } = require('./schemaValidator');

const validateLoginResponse = response => {
  const body = validateSuccessResponse(response, STATUS_CODES.OK);
  const data = body.data || body;

  validateResponseSchema(data, responseSchemas.auth);
  expect(data.user.email || data.user.id).toBeDefined();

  return data;
};

const validateProtectedContextResponse = response => {
  const body = validateSuccessResponse(response, STATUS_CODES.OK);
  const context = body.data || body;

  expect(Array.isArray(context)).toBe(true);

  context.forEach(institute => {
    expect(institute.institute_id || institute.id).toBeDefined();
    expect(institute.institute_name || institute.name).toBeDefined();
    expect(Array.isArray(institute.roles || [])).toBe(true);
  });

  return context;
};

module.exports = {
  validateLoginResponse,
  validateProtectedContextResponse,
};
