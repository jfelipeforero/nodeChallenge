import express from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { resetPassword } from '../controllers';

const router = express.Router();

router.get(
  '/api/reset',
  [body('password').isEmail().withMessage('Email must be valid')],
  requireAuth,
  resetPassword
);

export { router as resetPasswordRouter };
