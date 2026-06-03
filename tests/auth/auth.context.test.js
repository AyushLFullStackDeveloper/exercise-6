const apiConfig = require('../../helpers/apiConfig');
const request = require('../../helpers/requestHelper');
const { getAuthToken, validateProtectedContextResponse } = require('../../helpers/authHelper');
const { validateSuccessStructure } = require('../../helpers/responseValidator');
const { validateSensitiveFields } = require('../../helpers/securityValidator');
const { isApiReachable, skipIf } = require('../../helpers/testGuards');

describe('Auth - Context', () => {
  let apiAvailable;

  beforeAll(async () => {
    apiAvailable = await isApiReachable();
  });

  it('returns authenticated institute-role context with expected business fields', async () => {
    if (
      skipIf(!apiAvailable, 'Backend is not reachable.') ||
      skipIf(!apiConfig.credentials.email, 'Set API_TEST_EMAIL to run context contract.')
    ) {
      return;
    }

    const token = await getAuthToken();
    const response = await request.get(apiConfig.endpoints.myInstitutesRoles, {
      headers: request.authHeaders(token),
    });
    const context = validateProtectedContextResponse(response);

    validateSuccessStructure(response.data);
    validateSensitiveFields(response.data);
    context.forEach(institute => {
      expect(institute.institute_id || institute.id).toBeDefined();
      expect(institute.institute_name || institute.name).toBeDefined();
    });
  });
});
