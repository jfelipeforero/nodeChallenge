import express, { json } from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { queryRouter } from './routes/query';

const app = express();
app.set('trust proxy', true);

app.use(json());

app.use(queryRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

export { app };
