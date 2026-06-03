# Test Execution Guide

## API Tests

Run the API suite with:

```sh
npm run api:test
```

This still resolves through `tests/api.jest.config.js`, which now delegates to `config/api.jest.config.js`.

## Environment Variables

- `API_BASE_URL`: backend base URL.
- `API_TEST_EMAIL`: authenticated test user email.
- `API_TEST_PASSWORD`: authenticated test user password.
- `API_USERS_PATH`: users resource endpoint.
- `API_INSTITUTES_PATH`: institutes resource endpoint.
- `API_ROLES_PATH`: roles resource endpoint.
- `API_MAPPINGS_PATH`: mappings resource endpoint.

Optional tuning:

- `API_TIMEOUT_MS`
- `API_PERFORMANCE_THRESHOLD_MS`
- `API_STRESS_THRESHOLD_MS`
- `API_JEST_TIMEOUT_MS`
- `API_JEST_MAX_WORKERS`

## Reports

The reporter writes:

- `reports/html/api-test-report.html`
- `reports/junit/api-test-results.xml`
- `reports/logs/execution-summary.json`
- `reports/summaries/execution-summary.md`
- `reports/summaries/failed-tests-summary.json`
- `reports/summaries/coverage-summary.json`
