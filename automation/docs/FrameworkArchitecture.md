# API Automation Framework Architecture

## Overview

The API automation framework is organized around stable test suites and reusable support layers. Tests remain in `tests/` and consume helpers through existing compatibility imports or the newer grouped helper paths.

## Layers

- `config/`: environment, API, test, and Jest configuration.
- `helpers/api/`: HTTP client, entity CRUD helpers, and test guards.
- `helpers/auth/`: authentication workflow helpers.
- `helpers/cleanup/`: tracked cleanup for generated test data.
- `helpers/constants/`: endpoints, status codes, messages, and test limits.
- `helpers/factories/`: dynamic payload builders for users, institutes, roles, and mappings.
- `helpers/validators/`: response, auth, security, and schema validations.
- `fixtures/`: reusable static data and sample payloads.
- `setup/`: Jest global setup, teardown, and per-test initialization.
- `reports/`: generated HTML, JUnit, logs, and summaries.

## Compatibility

Existing flat helper imports such as `helpers/requestHelper.js`, `helpers/authHelper.js`, and `helpers/responseValidator.js` are preserved as shims. This lets current tests pass while new tests can use the grouped paths directly.
