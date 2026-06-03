module.exports = async () => {
  process.env.API_TEST_RUN_FINISHED_AT = new Date().toISOString();
};
