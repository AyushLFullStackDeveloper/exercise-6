const axios = require('axios');
const apiConfig = require('./apiConfig');

const client = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeoutMs,
  validateStatus: () => true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authHeaders = token => ({
  Authorization: `Bearer ${token}`,
});

const authenticatedOptions = token => ({
  headers: authHeaders(token),
});

const request = {
  get: (url, options = {}) => client.get(url, options),
  post: (url, data, options = {}) => client.post(url, data, options),
  put: (url, data, options = {}) => client.put(url, data, options),
  patch: (url, data, options = {}) => client.patch(url, data, options),
  delete: (url, options = {}) => client.delete(url, options),
  authHeaders,
  authenticatedOptions,
};

module.exports = request;
