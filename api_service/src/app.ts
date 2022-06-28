import express, { json } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import * as routes from './routes';
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
  routes.signupRouter,
  routes.signoutRouter,
  routes.requestStockRouter,
  routes.userHistoryRouter,
  routes.statsRouter,
  routes.resetPasswordRouter
);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
