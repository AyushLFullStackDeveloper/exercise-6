const { request, initTestDb, closeDb, getAuthToken } = require('./setup');

beforeAll(async () => {
  await initTestDb();
});

afterAll(async () => {
  await closeDb();
});

describe('Security and hardening', () => {
  test('protected API without token returns unauthorized', async () => {
    const res = await request.get('/auth/my-institutes-roles');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('protected API with invalid token returns unauthorized', async () => {
    const res = await request
      .get('/auth/my-institutes-roles')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('protected API with tampered token returns unauthorized', async () => {
    const token = await getAuthToken();
    const tampered = token.slice(0, -1) + (token.slice(-1) === 'a' ? 'b' : 'a');

    const res = await request
      .get('/auth/my-institutes-roles')
      .set('Authorization', `Bearer ${tampered}`);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('token without Bearer keyword returns unauthorized', async () => {
    const token = await getAuthToken();
    const res = await request
      .get('/auth/my-institutes-roles')
      .set('Authorization', token);

    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  test('SQL injection payload returns invalid credentials or safe failure', async () => {
    const res = await request.post('/auth/login').send({
      email: "' OR '1'='1@example.com",
      password: 'anything'
    });

    expect([400, 401]).toContain(res.statusCode);
    expect(res.body.success).toBe(false);
  });

  test('XSS payload returns invalid credentials or safe failure', async () => {
    const res = await request.post('/auth/login').send({
      email: '<script>alert(1)</script>@example.com',
      password: 'anything'
    });

    expect([400, 401]).toContain(res.statusCode);
    expect(res.body.success).toBe(false);
  });

  test('malformed JSON returns parser error', async () => {
    const res = await request
      .post('/auth/login')
      .set('Content-Type', 'application/json')
      .send('{"email":"bad@example.com"');

    expect([400, 413, 500]).toContain(res.statusCode);
  });

  test('large payload handling returns client or server error', async () => {
    const largeString = 'x'.repeat(200000);
    const res = await request.post('/auth/login').send({
      email: 'large@example.com',
      password: largeString
    });

    expect([400, 413, 500]).toContain(res.statusCode);
  });

  test('sensitive fields are not exposed in login response', async () => {
    const res = await request.post('/auth/login').send({
      email: 'ayushn@gmail.com',
      password: '123'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.user).toBeDefined();
    expect(res.body.user.password).toBeUndefined();
    expect(res.body.user.password_hash).toBeUndefined();
  });

  test('reused valid token works on protected endpoint', async () => {
    const token = await getAuthToken();

    const first = await request
      .get('/auth/my-institutes-roles')
      .set('Authorization', `Bearer ${token}`);
    const second = await request
      .get('/auth/my-institutes-roles')
      .set('Authorization', `Bearer ${token}`);

    expect(first.statusCode).toBe(200);
    expect(second.statusCode).toBe(200);
    expect(JSON.stringify(first.body)).toEqual(JSON.stringify(second.body));
  });
});
