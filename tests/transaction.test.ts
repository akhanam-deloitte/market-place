import request from 'supertest';
import app from '../src/index';

let token: string;
let itemId: number;

beforeAll(async () => {
  const login = await request(app).post('/api/auth/login').send({
    email: 'asma_test@example.com',
    password: 'strongpassword'
  });
  token = login.body.token;

  const item = await request(app)
    .post('/api/items')
    .set('Authorization', `Bearer ${token}`)
    .field('name', 'Item for Transaction')
    .field('description', 'Test')
    .field('price', '999');
  itemId = item.body.id;
},50000);

describe('Transaction API', () => {
  it('should initiate a transaction', async () => {
    const res = await request(app)
      .post('/api/transactions')
      .set('Authorization', `Bearer ${token}`)
      .send({
        itemId,
        type: 'BUY'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('status', 'pending');
  },50000);

  it('should list user transactions', async () => {
    const res = await request(app)
      .get('/api/transactions')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  },50000);
});
