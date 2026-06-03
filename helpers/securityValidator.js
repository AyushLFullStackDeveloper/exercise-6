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

const stringifyPayload = payload => JSON.stringify(payload || {}).toLowerCase();

const validateSensitiveFields = payload => {
  const serialized = stringifyPayload(payload);

  SENSITIVE_FIELDS.forEach(field => {
    expect(serialized).not.toContain(`"${field.toLowerCase()}"`);
  });
};

const validateNoSqlInjectionLeakage = response => {
  const serialized = stringifyPayload(response.data);

  expect(serialized).not.toContain('syntax error');
  expect(serialized).not.toContain('sqlstate');
  expect(serialized).not.toContain('postgres');
  expect(serialized).not.toContain('mysql');
};

const validateNoXssReflection = (response, payload) => {
  const serialized = JSON.stringify(response.data || {});
  expect(serialized).not.toContain(payload);
};

module.exports = {
  SENSITIVE_FIELDS,
  validateSensitiveFields,
  validateNoSqlInjectionLeakage,
  validateNoXssReflection,
};
