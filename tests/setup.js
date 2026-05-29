const supertest = require('supertest');
const app = require('../app');
const initDb = require('../db/init');
const db = require('../config/db');

const request = supertest(app);

const validAdminUser = { email: 'ayushn@gmail.com', password: '123' };
const multipleRoleUser = { email: 'divyanshu@gmail.com', password: '123' };

const login = async (payload) => {
  return request.post('/auth/login').send(payload);
};

const getAuthToken = async ({ email = validAdminUser.email, password = validAdminUser.password } = {}) => {
  const response = await login({ email, password });
  return response.body?.token;
};

const initTestDb = async () => {
  await initDb({ force: true });
};

const closeDb = async () => {
  if (db?.pool) {
    await db.pool.end();
  }
};

module.exports = {
  request,
  app,
  login,
  getAuthToken,
  initTestDb,
  closeDb,
  validAdminUser,
  multipleRoleUser
};
