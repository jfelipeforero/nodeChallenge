import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import {
  signupRouter,
  signoutRouter,
  requestStockRouter,
  userHistoryRouter,
  statsRouter,
  resetPasswordRouter,
} from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors';
import { currentUser } from './middlewares/current-user';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);

app.use(
  signupRouter,
  signoutRouter,
  requestStockRouter,
  userHistoryRouter,
  statsRouter,
  resetPasswordRouter
);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
