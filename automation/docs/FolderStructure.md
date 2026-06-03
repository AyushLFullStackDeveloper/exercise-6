# Folder Structure

```text
config/
  apiConfig.js
  environments.js
  testConfig.js
  api.jest.config.js
  e2e.jest.config.js
  jest.base.config.js
fixtures/
  users.json
  roles.json
  institutes.json
  mappings.json
  payloads/
helpers/
  api/
  auth/
  cleanup/
  constants/
  factories/
  performance/
  security/
  validators/
reports/
  html/
  junit/
  logs/
  summaries/
setup/
  globalSetup.js
  globalTeardown.js
  testSetup.js
tests/
  auth/
  users/
  institutes/
  roles/
  mappings/
  security/
  performance/
```

Flat helper files remain for backward compatibility and re-export grouped modules.
