import express from 'express';
import { query } from '../controllers/query.controller';

const router = express.Router();

router.get('/stock/query', query);

export { router as queryRouter };
