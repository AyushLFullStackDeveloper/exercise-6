const measureRequest = async requestFactory => {
  const start = Date.now();
  const response = await requestFactory();

  return {
    response,
    durationMs: Date.now() - start,
  };
};

const runConcurrent = async (requestFactory, count) => {
  const requests = Array.from({ length: count }, () => measureRequest(requestFactory));
  return Promise.all(requests);
};

const expectWithinThreshold = (durationMs, thresholdMs) => {
  expect(durationMs).toBeLessThanOrEqual(thresholdMs);
};

module.exports = {
  measureRequest,
  runConcurrent,
  expectWithinThreshold,
};
