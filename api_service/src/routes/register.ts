import express from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { register } from '../controllers/register.controller';

const router = express.Router();

router.post(
  '/api/register',
  [body('email').isEmail().withMessage('Email must be valid')],
  validateRequest,
  register
);

export { router as signupRouter };
