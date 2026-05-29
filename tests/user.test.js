const { request, initTestDb, closeDb } = require('./setup');

const makeUniqueEmail = () => `testing+${Date.now()}-${Math.random().toString(36).substring(2, 8)}@example.com`;
let createdUserId;

beforeAll(async () => {
  await initTestDb();
});

afterAll(async () => {
  await closeDb();
});

describe('User API', () => {
  describe('POST /users', () => {
    test('create valid user returns success and hides password fields', async () => {
      const payload = {
        first_name: 'Test',
        last_name: 'User',
        full_name: 'Test User',
        email: makeUniqueEmail(),
        password: 'Secret123!'
      };

      const res = await request.post('/users').send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({ email: payload.email, full_name: payload.full_name });
      expect(res.body.data.password).toBeUndefined();
      expect(res.body.data.password_hash).toBeUndefined();
      expect(res.body.data.id).toBeDefined();

      createdUserId = res.body.data.id;
    });

    test('create user without first_name uses name fallback', async () => {
      const payload = {
        name: 'Auto Generated',
        email: makeUniqueEmail(),
        password: 'Secret123!'
      };

      const res = await request.post('/users').send(payload);

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe(payload.email);
      expect(res.body.data.full_name).toBe('Auto Generated');
    });

    test('create user missing email returns error', async () => {
      const res = await request.post('/users').send({ first_name: 'NoEmail', password: 'Secret123!' });

      expect([400, 500]).toContain(res.statusCode);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    test('create user missing password returns error', async () => {
      const res = await request.post('/users').send({ first_name: 'NoPassword', email: makeUniqueEmail() });

      expect([400, 500]).toContain(res.statusCode);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    test('duplicate email returns conflict error', async () => {
      const payload = {
        first_name: 'Duplicate',
        last_name: 'User',
        full_name: 'Duplicate User',
        email: makeUniqueEmail(),
        password: 'Secret123!'
      };

      const first = await request.post('/users').send(payload);
      expect(first.statusCode).toBe(201);

      const second = await request.post('/users').send(payload);
      expect([400, 500]).toContain(second.statusCode);
      expect(second.body.success).toBe(false);
      expect(second.body.message).toBeDefined();
    });

    test('empty request body returns error', async () => {
      const res = await request.post('/users').send({});

      expect([400, 500]).toContain(res.statusCode);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('Users route fallbacks', () => {
    test('GET /users returns 404 when route not available', async () => {
      const res = await request.get('/users');
      expect(res.statusCode).toBe(404);
    });

    test('GET /users/:id returns 404 for valid user id', async () => {
      const res = await request.get(`/users/${createdUserId || '11111111-1111-1111-1111-111111111111'}`);
      expect(res.statusCode).toBe(404);
    });

    test('GET /users/:id returns 404 for invalid user id', async () => {
      const res = await request.get('/users/00000000-0000-0000-0000-000000000000');
      expect(res.statusCode).toBe(404);
    });

    test('PUT /users/:id returns 404 for update', async () => {
      const res = await request.put('/users/11111111-1111-1111-1111-111111111111').send({ first_name: 'Updated' });
      expect(res.statusCode).toBe(404);
    });

    test('DELETE /users/:id returns 404 for delete', async () => {
      const res = await request.delete('/users/11111111-1111-1111-1111-111111111111');
      expect(res.statusCode).toBe(404);
    });
  });
});
