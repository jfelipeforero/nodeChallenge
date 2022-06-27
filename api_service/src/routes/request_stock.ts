import express from 'express';
import { requestStock } from '../controllers';
import { requireAuth } from '../middlewares/require-auth';

const router = express.Router();

router.get('/api/stock', requireAuth, requestStock);

export { router as requestStockRouter };
