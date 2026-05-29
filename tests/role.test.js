const { request, initTestDb, closeDb } = require('./setup');

const validRolePayload = () => ({
  name: `Role ${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
  code: `ROLE-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
  logo: 'https://example.com/role.png'
});

let createdRoleId;

beforeAll(async () => {
  await initTestDb();
});

afterAll(async () => {
  await closeDb();
});

describe('Role API', () => {
  describe('POST /roles', () => {
    test('create valid role returns role schema', async () => {
      const res = await request.post('/roles').send(validRolePayload());

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('role_name');

      createdRoleId = res.body.data.id;
    });
  });

  describe('Role route fallbacks', () => {
    test('GET /roles returns 404 when route not available', async () => {
      const res = await request.get('/roles');
      expect(res.statusCode).toBe(404);
    });

    test('GET /roles/:id returns 404 for valid id', async () => {
      const res = await request.get(`/roles/${createdRoleId || '01111111-1111-1111-1111-111111111111'}`);
      expect(res.statusCode).toBe(404);
    });

    test('GET /roles/:id returns 404 for invalid id', async () => {
      const res = await request.get('/roles/00000000-0000-0000-0000-000000000000');
      expect(res.statusCode).toBe(404);
    });

    test('PUT /roles/:id returns 404 when update is not implemented', async () => {
      const res = await request.put('/roles/01111111-1111-1111-1111-111111111111').send({ name: 'Updated Role' });
      expect(res.statusCode).toBe(404);
    });

    test('DELETE /roles/:id returns 404 when delete is not implemented', async () => {
      const res = await request.delete('/roles/01111111-1111-1111-1111-111111111111');
      expect(res.statusCode).toBe(404);
    });
  });
});
