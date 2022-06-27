import express, { json } from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import cors from 'cors';
import { queryRouter } from './routes/query';

const app = express();
// app.set('trust proxy', true);
app.use(cors());

app.use(json());

app.use(queryRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

export { app };
