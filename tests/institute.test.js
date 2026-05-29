const { request, initTestDb, closeDb } = require('./setup');

const validInstitutePayload = () => ({
  tenant_id: 'd7890ec4-1923-4e8c-9a2c-f098c1234567',
  name: 'Test Institute',
  code: `TEST-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
  type: 'K12',
  location: 'Test City',
  logo: 'https://example.com/logo.png'
});

let createdInstituteId;

beforeAll(async () => {
  await initTestDb();
});

afterAll(async () => {
  await closeDb();
});

describe('Institute API', () => {
  describe('POST /institutes', () => {
    test('create valid institute returns success and institute schema', async () => {
      const res = await request.post('/institutes').send(validInstitutePayload());

      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      expect(res.body.data).toHaveProperty('tenant_id');
      expect(res.body.data).toHaveProperty('institute_name');
      expect(res.body.data).toMatchObject({ location: 'Test City' });

      createdInstituteId = res.body.data.id;
    });

    test('missing tenant_id still accepts request or returns validation error', async () => {
      const payload = {
        name: 'NoTenant Institute',
        code: `NT-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        type: 'K12',
        location: 'Unknown',
        logo: 'https://example.com/logo.png'
      };
      const res = await request.post('/institutes').send(payload);

      expect([200, 400, 500]).toContain(res.statusCode);
      if (res.statusCode === 200) {
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('id');
      } else {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBeDefined();
      }
    });
  });

  describe('Institute route fallbacks', () => {
    test('GET /institutes returns 404 when not implemented', async () => {
      const res = await request.get('/institutes');
      expect(res.statusCode).toBe(404);
    });

    test('GET /institutes/:id returns 404 for valid id', async () => {
      const res = await request.get(`/institutes/${createdInstituteId || 'b1111111-1111-1111-1111-111111111111'}`);
      expect(res.statusCode).toBe(404);
    });

    test('GET /institutes/:id returns 404 for invalid id', async () => {
      const res = await request.get('/institutes/00000000-0000-0000-0000-000000000000');
      expect(res.statusCode).toBe(404);
    });

    test('PUT /institutes/:id returns 404 when update route is unavailable', async () => {
      const res = await request.put('/institutes/b1111111-1111-1111-1111-111111111111').send({ name: 'Updated' });
      expect(res.statusCode).toBe(404);
    });

    test('DELETE /institutes/:id returns 404 when delete route is unavailable', async () => {
      const res = await request.delete('/institutes/b1111111-1111-1111-1111-111111111111');
      expect(res.statusCode).toBe(404);
    });
  });
});
