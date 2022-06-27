import express from 'express';
import { stats } from '../controllers/stats.controller';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/stats', requireAuth, stats);

export { router as statsRouter };
