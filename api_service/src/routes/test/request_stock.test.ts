import request from 'supertest';
import { app } from '../../app';
import { Stock } from '../../models/Stock';

it('Has a route handler listening to /api/stock for get request', async () => {
  const response = await request(app).get('/api/stock').send({});

  expect(response.status).not.toEqual(404);
});

it('Can only be accessed if the user is signed in', async () => {
  await request(app).get('/api/stock').send({}).expect(401);
});

it('Returns an error if no stock is provided', async () => {
  await request(app)
    .get('/api/stock')
    .set('Cookie', global.signin())
    .send()
    .expect(400);
});

it('Returns a requested stock and save it in the database', async () => {
  let stocks = await Stock.find({});
  expect(stocks.length).toEqual(0);

  const stockk = await request(app)
    .get('/api/stock?q=aapl.us')
    .set('Cookie', global.signin())
    .send({})
    .expect(201);

  console.log(stockk);

  stocks = await Stock.find({});

  expect(stocks.length).toEqual(1);
});
