import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/register')
    .send({
      email: 'test@test.com',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/register')
    .send({
      email: 'notavalidemail.com',
    })
    .expect(400);
});
