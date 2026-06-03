# Contribution Guide

## Adding Tests

- Place API tests under the matching `tests/<domain>/` folder.
- Use factories for request payloads instead of hardcoded data.
- Use constants for endpoints, status codes, messages, limits, and reusable values.
- Use validators for response assertions and schema checks.
- Register created entities with cleanup helpers when tests create persistent data.

## Adding Helpers

- Put new HTTP helpers in `helpers/api/`.
- Put payload builders in `helpers/factories/`.
- Put reusable assertions in `helpers/validators/`.
- Put reusable literal values in `helpers/constants/`.

## Reporting

Keep existing report filenames stable. Add new report artifacts under `reports/summaries/` unless a consumer explicitly requires a different path.

## Safety

Avoid changing business logic in tests during framework work. Prefer compatibility shims when moving helper modules so existing imports continue to work.
