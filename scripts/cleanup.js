const apiConfig = require('../helpers/apiConfig');

const main = async () => {
  console.log(`Cleanup script placeholder for ${apiConfig.baseUrl}.`);
  console.log('Test-created data is cleaned by cleanupHelper during tests when delete endpoints are configured.');
};

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = main;
