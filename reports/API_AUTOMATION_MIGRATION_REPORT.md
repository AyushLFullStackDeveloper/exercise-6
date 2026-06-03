# Exercise 6 API Automation Migration Report

## Files Moved

- `e2e/api/authApi.test.js` split into `tests/auth/auth.login.test.js`, `tests/auth/auth.context.test.js`, and `tests/auth/auth.middleware.test.js`.
- `e2e/api/crudApi.test.js` split into `tests/users`, `tests/institutes`, and `tests/roles` create/get/update/delete specs.
- `e2e/api/mappingApi.test.js` split into `tests/mappings` create/get/update/delete specs.
- `e2e/api/securityApi.test.js` split into `tests/security` JWT, authorization, SQL injection, XSS, and malformed payload specs.
- `e2e/api/performanceApi.test.js` split into `tests/performance` response time, concurrent requests, and stress specs.
- `e2e/authFlow.test.js` split into `tests/e2e/loginFlow.test.js`, `tests/e2e/instituteSelectionFlow.test.js`, and `tests/e2e/fullJourney.test.js`.
- `e2e/helpers/*` moved into the root-level `helpers/` framework layer.

## Files Created

- `tests/auth/*`
- `tests/users/*`
- `tests/institutes/*`
- `tests/roles/*`
- `tests/mappings/*`
- `tests/security/*`
- `tests/performance/*`
- `tests/e2e/*`
- `tests/api.jest.config.js`
- `tests/e2e.jest.config.js`
- `tests/reporters/enterpriseReporter.js`
- `helpers/*`
- `reports/html/.gitkeep`
- `reports/junit/.gitkeep`
- `reports/logs/.gitkeep`
- `scripts/seed.js`
- `scripts/cleanup.js`
- `scripts/reset-db.js`

## Utilities Added

- `authHelper.js`: login, token generation, login/context validators.
- `requestHelper.js`: reusable Axios client and authenticated request headers.
- `responseValidator.js`: success, error, unauthorized, forbidden, pagination, and response structure validators.
- `securityValidator.js`: sensitive field, SQL leakage, and XSS reflection checks.
- `cleanupHelper.js`: test-created entity cleanup registry.
- `performanceHelper.js`: response time and concurrent request utilities.
- `dataFactory.js`: dynamic user, institute, role, and mapping graph creation.
- `resourceTestHelper.js`: shared CRUD test operations.
- `mappingTestHelper.js`: shared mapping setup and validation operations.

## Tests Added

- Auth: login, context, middleware.
- Users: create, get, update, delete.
- Institutes: create, get, update, delete.
- Roles: create, get, update, delete.
- Mappings: create, get, update, delete, duplicate mapping, invalid IDs, deleted entity, orphan mapping.
- Security: missing JWT, invalid JWT, expired JWT, tampered JWT, SQL injection, XSS, malformed JSON, unauthorized access.
- Performance: response time, concurrent requests, repeated request stress.
- E2E: login flow, institute selection flow, complete journey.

## Duplicates Removed

- Removed the monolithic API specs from `e2e/api`.
- Removed duplicated helper copies from `e2e/helpers`.
- Centralized CRUD and mapping setup, auth, cleanup, and assertions in shared helpers.

## Potential Issues Found

- This frontend repo only documents `POST /auth/login` and `GET /auth/my-institutes-roles`.
- CRUD and mapping tests require configured endpoint env vars:
  - `API_USERS_PATH`
  - `API_INSTITUTES_PATH`
  - `API_ROLES_PATH`
  - `API_MAPPINGS_PATH`
- Authorization test requires `API_FORBIDDEN_ACCESS_PATH`.
- Authenticated API tests require `API_TEST_EMAIL` and `API_TEST_PASSWORD`.
- Detox E2E flows still rely on known seeded UI users because backend seed contracts are not available in this repo.

## Recommended Future Improvements

- Add OpenAPI documentation and generate schema assertions from it.
- Replace placeholder DB scripts with real backend seed/reset commands.
- Add dedicated admin and restricted-role API accounts for authorization coverage.
- Add CI jobs that publish `reports/html`, `reports/junit`, and `reports/logs`.
- Add real database cleanup hooks if API delete endpoints are not available.
