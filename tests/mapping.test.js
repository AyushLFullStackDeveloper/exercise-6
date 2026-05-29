const { request, initTestDb, closeDb } = require('./setup');

const validMappingPayload = () => ({
  tenant_id: 'd7890ec4-1923-4e8c-9a2c-f098c1234567',
  user_id: '11111111-1111-1111-1111-111111111111',
  institute_id: 'b2222222-2222-2222-2222-222222222222',
  role_id: '02222222-2222-2222-2222-222222222222'
});

let createdMappingId;

beforeAll(async () => {
  await initTestDb();
});

afterAll(async () => {
  await closeDb();
});

describe('Mapping API', () => {
  describe('POST /mappings', () => {
    test('create valid mapping returns success with mapping id', async () => {
      const res = await request.post('/mappings').send(validMappingPayload());

      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty('id');
      createdMappingId = res.body.data.id;
    });

    test('missing tenant_id returns validation error', async () => {
      const payload = { ...validMappingPayload() };
      delete payload.tenant_id;

      const res = await request.post('/mappings').send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    test('missing user_id returns validation error', async () => {
      const payload = { ...validMappingPayload() };
      delete payload.user_id;

      const res = await request.post('/mappings').send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    test('missing institute_id returns validation error', async () => {
      const payload = { ...validMappingPayload() };
      delete payload.institute_id;

      const res = await request.post('/mappings').send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    test('missing role_id returns validation error', async () => {
      const payload = { ...validMappingPayload() };
      delete payload.role_id;

      const res = await request.post('/mappings').send(payload);

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });

    test('empty body returns validation error', async () => {
      const res = await request.post('/mappings').send({});

      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('Mapping route fallbacks', () => {
    test('GET /mappings returns 404 when route does not exist', async () => {
      const res = await request.get('/mappings');
      expect(res.statusCode).toBe(404);
    });

    test('GET /mappings/:id returns 404 for valid mapping id', async () => {
      const res = await request.get(`/mappings/${createdMappingId || '11111111-1111-1111-1111-111111111111'}`);
      expect(res.statusCode).toBe(404);
    });

    test('GET /mappings/:id returns 404 for invalid mapping id', async () => {
      const res = await request.get('/mappings/00000000-0000-0000-0000-000000000000');
      expect(res.statusCode).toBe(404);
    });

    test('PUT /mappings/:id returns 404 when update route is unavailable', async () => {
      const res = await request.put('/mappings/11111111-1111-1111-1111-111111111111').send({ role_id: '02222222-2222-2222-2222-222222222222' });
      expect(res.statusCode).toBe(404);
    });

    test('DELETE /mappings/:id returns 404 when delete route is unavailable', async () => {
      const res = await request.delete('/mappings/11111111-1111-1111-1111-111111111111');
      expect(res.statusCode).toBe(404);
    });
  });
});
