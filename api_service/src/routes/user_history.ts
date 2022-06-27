import express from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { userHistory } from '../controllers';

const router = express.Router();

router.get('/api/history', requireAuth, userHistory);

export { router as userHistoryRouter };
