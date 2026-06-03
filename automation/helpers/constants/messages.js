const MESSAGES = {
  missingCredentials:
    'Set API_TEST_EMAIL and API_TEST_PASSWORD to run authenticated API tests.',
  backendUnavailable: 'Backend is not reachable.',
  missingEmail: 'Set API_TEST_EMAIL to run authenticated API contracts.',
  missingEndpoint: endpointName =>
    `Set ${endpointName} endpoint env var to run this contract test.`,
};

module.exports = MESSAGES;
