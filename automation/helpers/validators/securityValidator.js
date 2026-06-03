const SENSITIVE_FIELDS = [
  'password',
  'password_hash',
  'passwordHash',
  'salt',
  'otp',
  'secret',
  'resetToken',
  'refreshToken',
];

const SQL_ERROR_SIGNATURES = ['syntax error', 'sqlstate', 'postgres', 'mysql'];

const stringifyPayload = payload => JSON.stringify(payload || {}).toLowerCase();

const validateSensitiveFields = payload => {
  const serialized = stringifyPayload(payload);

  SENSITIVE_FIELDS.forEach(field => {
    expect(serialized).not.toContain(`"${field.toLowerCase()}"`);
  });
};

const validateNoSqlInjectionLeakage = response => {
  const serialized = stringifyPayload(response.data);

  SQL_ERROR_SIGNATURES.forEach(signature => {
    expect(serialized).not.toContain(signature);
  });
};

const validateNoXssReflection = (response, payload) => {
  const serialized = JSON.stringify(response.data || {});
  expect(serialized).not.toContain(payload);
};

module.exports = {
  SENSITIVE_FIELDS,
  SQL_ERROR_SIGNATURES,
  validateSensitiveFields,
  validateNoSqlInjectionLeakage,
  validateNoXssReflection,
};
