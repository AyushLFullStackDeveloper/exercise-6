const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const reportsDir = path.join(rootDir, 'reports');

const ensureDir = dir => {
  fs.mkdirSync(dir, { recursive: true });
};

const escapeXml = value =>
  String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

class EnterpriseReporter {
  onRunComplete(contexts, results) {
    const htmlDir = path.join(reportsDir, 'html');
    const junitDir = path.join(reportsDir, 'junit');
    const logsDir = path.join(reportsDir, 'logs');

    [htmlDir, junitDir, logsDir].forEach(ensureDir);

    const testResults = results.testResults.flatMap(suite =>
      suite.testResults.map(test => ({
        suite: path.relative(rootDir, suite.testFilePath),
        title: test.fullName,
        status: test.status,
        duration: test.duration || 0,
        failures: test.failureMessages || [],
      })),
    );

    const summary = {
      generatedAt: new Date().toISOString(),
      numTotalTestSuites: results.numTotalTestSuites,
      numPassedTestSuites: results.numPassedTestSuites,
      numFailedTestSuites: results.numFailedTestSuites,
      numTotalTests: results.numTotalTests,
      numPassedTests: results.numPassedTests,
      numFailedTests: results.numFailedTests,
      numPendingTests: results.numPendingTests,
      testResults,
    };

    fs.writeFileSync(
      path.join(logsDir, 'execution-summary.json'),
      JSON.stringify(summary, null, 2),
    );

    const rows = testResults
      .map(
        test =>
          `<tr><td>${escapeXml(test.suite)}</td><td>${escapeXml(test.title)}</td><td>${escapeXml(test.status)}</td><td>${test.duration}</td></tr>`,
      )
      .join('\n');

    fs.writeFileSync(
      path.join(htmlDir, 'api-test-report.html'),
      [
        '<!doctype html>',
        '<html><head><meta charset="utf-8"><title>API Test Report</title>',
        '<style>body{font-family:Arial,sans-serif;margin:24px}table{border-collapse:collapse;width:100%}td,th{border:1px solid #ddd;padding:8px}th{background:#f4f4f4;text-align:left}</style>',
        '</head><body>',
        '<h1>API Test Report</h1>',
        `<p>Total: ${results.numTotalTests} | Passed: ${results.numPassedTests} | Failed: ${results.numFailedTests} | Pending: ${results.numPendingTests}</p>`,
        '<table><thead><tr><th>Suite</th><th>Test</th><th>Status</th><th>Duration Ms</th></tr></thead>',
        `<tbody>${rows}</tbody></table>`,
        '</body></html>',
      ].join('\n'),
    );

    const cases = testResults
      .map(test => {
        const failure = test.failures.length
          ? `<failure>${escapeXml(test.failures.join('\n'))}</failure>`
          : '';
        return `<testcase classname="${escapeXml(test.suite)}" name="${escapeXml(test.title)}" time="${test.duration / 1000}">${failure}</testcase>`;
      })
      .join('\n');

    fs.writeFileSync(
      path.join(junitDir, 'api-test-results.xml'),
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        `<testsuite tests="${results.numTotalTests}" failures="${results.numFailedTests}" skipped="${results.numPendingTests}">`,
        cases,
        '</testsuite>',
      ].join('\n'),
    );
  }
}

module.exports = EnterpriseReporter;
