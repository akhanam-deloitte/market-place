import request from 'supertest';
import app from '../src/index';

let token: string;

beforeAll(async () => {
  const res = await request(app).post('/api/auth/login').send({
    email: 'asma_test@example.com',
    password: 'strongpassword'
  });
  token = res.body.token;
},50000);

describe('Item API', () => {
  let itemId: number;

  it('should create an item', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Test Item')
      .field('description', 'Sample Description')
      .field('price', '1000');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    itemId = res.body.id;
  },50000);

  it('should fetch all items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  },50000);

  it('should delete an item', async () => {
    const res = await request(app)
      .delete(`/api/items/${itemId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  },50000);
});
