import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { Password } from '../utils/password';
import { BadRequestError } from '../errors';
import { User, UserAttrs } from '../models/User';

const register = async (req: Request, res: Response) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email in use');
  }
  const password = await Password.createPassword();
  const user = await new User<UserAttrs>({ email, password });
  await user.save();

  //Generate JWT
  const userJWT = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_KEY!
  );

  req.session = {
    jwt: userJWT,
  };

  res.status(StatusCodes.CREATED).send({ email: user.email, password });
};

export { register };
