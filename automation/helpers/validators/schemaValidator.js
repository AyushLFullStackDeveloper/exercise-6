const TYPE_CHECKS = {
  array: value => Array.isArray(value),
  boolean: value => typeof value === 'boolean',
  number: value => typeof value === 'number',
  object: value => value !== null && typeof value === 'object' && !Array.isArray(value),
  string: value => typeof value === 'string',
};

const getValue = (payload, path) => {
  return path.split('.').reduce((value, key) => value?.[key], payload);
};

const validateFieldType = (payload, fieldPath, expectedType) => {
  const value = getValue(payload, fieldPath);
  const types = Array.isArray(expectedType) ? expectedType : [expectedType];

  expect(value).toBeDefined();
  expect(types.some(type => TYPE_CHECKS[type]?.(value))).toBe(true);
};

const validateResponseSchema = (payload, schema = {}) => {
  expect(payload).toEqual(expect.any(Object));

  (schema.required || []).forEach(fieldPath => {
    expect(getValue(payload, fieldPath)).toBeDefined();
  });

  Object.entries(schema.fields || {}).forEach(([fieldPath, expectedType]) => {
    validateFieldType(payload, fieldPath, expectedType);
  });

  (schema.anyOf || []).forEach(fieldPaths => {
    expect(fieldPaths.some(fieldPath => getValue(payload, fieldPath) !== undefined)).toBe(true);
  });

  return payload;
};

const responseSchemas = {
  success: {
    fields: {
      success: 'boolean',
    },
  },
  error: {
    anyOf: [['message', 'error', 'errors']],
  },
  pagination: {
    anyOf: [['pagination', 'meta.pagination', 'meta']],
  },
  auth: {
    anyOf: [['token', 'accessToken', 'pre_context_token']],
    fields: {
      user: 'object',
    },
  },
};

module.exports = {
  responseSchemas,
  validateResponseSchema,
};
