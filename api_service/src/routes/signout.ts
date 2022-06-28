import express from 'express';
import { signout } from '../controllers/signout.controller';

const router = express.Router();

router.post('/api/signout', signout);

export { router as signoutRouter };
