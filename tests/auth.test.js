const { request, initTestDb, closeDb, login, multipleRoleUser } = require('./setup');

let validToken;
let roleSelectionToken;
let roleSelectionResponse;

beforeAll(async () => {
  await initTestDb();
  validToken = (await login({ email: 'ayushn@gmail.com', password: '123' })).body.token;
  roleSelectionResponse = await login(multipleRoleUser);
  roleSelectionToken = roleSelectionResponse.body.token;
});

afterAll(async () => {
  await closeDb();
});

describe('Auth API', () => {
  describe('POST /auth/login', () => {
    test('valid login returns token and user object', async () => {
      const res = await login({ email: 'ayushn@gmail.com', password: '123' });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toMatchObject({
        email: 'ayushn@gmail.com'
      });
      expect(res.body.user.password).toBeUndefined();
      expect(res.body.user.password_hash).toBeUndefined();
    });

    test('invalid email returns invalid credentials', async () => {
      const res = await login({ email: 'missing@example.com', password: '123' });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    test('wrong password returns invalid credentials', async () => {
      const res = await login({ email: 'ayushn@gmail.com', password: 'wrong' });

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Invalid credentials');
    });

    test('empty body returns validation error', async () => {
      const res = await login({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Email and password are required');
    });
  });

  describe('GET /auth/my-institutes-roles', () => {
    test('returns user institutes and roles with valid token', async () => {
      const res = await request
        .get('/auth/my-institutes-roles')
        .set('Authorization', `Bearer ${validToken}`);

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('roles');
      }
    });

    test('returns unauthorized without token', async () => {
      const res = await request.get('/auth/my-institutes-roles');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Unauthorized');
    });

    test('returns unauthorized with invalid token', async () => {
      const res = await request
        .get('/auth/my-institutes-roles')
        .set('Authorization', 'Bearer invalid.token.value');

      expect(res.statusCode).toBe(401);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBe('Unauthorized');
    });
  });

  describe('POST /auth/select-context', () => {
    test('select institute and role with valid token', async () => {
      expect(roleSelectionResponse.statusCode).toBe(200);
      expect(roleSelectionResponse.body.flow).toBe('ROLE_SELECTION');
      expect(roleSelectionResponse.body.institute).toBeDefined();
      expect(Array.isArray(roleSelectionResponse.body.roles)).toBe(true);
      const instituteId = roleSelectionResponse.body.institute.id;
      const roleId = roleSelectionResponse.body.roles[0]?.id;

      const res = await request
        .post('/auth/select-context')
        .set('Authorization', `Bearer ${roleSelectionToken}`)
        .send({ institute_id: instituteId, role_id: roleId });

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeDefined();
      expect(res.body.message).toBe('Context selected successfully');
      expect(res.body.user).toMatchObject({ email: multipleRoleUser.email });
    });

    test('select context with invalid institute_id returns error', async () => {
      const res = await request
        .post('/auth/select-context')
        .set('Authorization', `Bearer ${roleSelectionToken}`)
        .send({ institute_id: '00000000-0000-0000-0000-000000000000', role_id: '01111111-1111-1111-1111-111111111111' });

      expect([400, 403]).toContain(res.statusCode);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });
  });
});
