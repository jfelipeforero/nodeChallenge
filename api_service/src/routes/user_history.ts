import express from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { userHistory } from '../controllers/user_history.controller';

const router = express.Router();

router.get('/api/history', requireAuth, userHistory);

export { router as userHistoryRouter };
