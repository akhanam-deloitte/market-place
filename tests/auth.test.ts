import request from 'supertest';
import app from '../src/index';
let variable = Date.now();
describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({ "username": `asma_doe_test${variable}`, "email": `asma_test${variable}@example.com`, "password": "strongpassword" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message');
  }, 50000);

  it('should login an existing user', async () => {
    const res = await request(app).post('/api/auth/login').send({"email": `asma_test${variable}@example.com`, "password": "strongpassword" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  }, 5000);
});
