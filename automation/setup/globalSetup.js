const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const reportDirs = ['reports/html', 'reports/junit', 'reports/logs', 'reports/summaries'];

module.exports = async () => {
  reportDirs.forEach(dir => {
    fs.mkdirSync(path.join(rootDir, dir), { recursive: true });
  });

  process.env.API_TEST_RUN_STARTED_AT = new Date().toISOString();
};
