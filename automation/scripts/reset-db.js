const cleanup = require('./cleanup');
const seed = require('./seed');

const main = async () => {
  await cleanup();
  await seed();
  console.log('Reset DB placeholder complete. Wire this to backend reset tooling when available.');
};

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}

module.exports = main;
