import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from '../models/User';
import nodemailer from 'nodemailer';
import { Password } from '../utils/password';

const resetPassword = async (req: Request, res: Response) => {
  const newPassword = await Password.createPassword();

  const filter = { id: req.currentUser?.id };
  const user = await User.findOne(filter);
  user!.password = newPassword;
  await user?.save();

  let testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'susana.altenwerth7@ethereal.email',
      pass: 'B7KagRkdJPfvjkmBYm',
    },
  });

  let info = await transporter.sendMail({
    from: 'nodeChallenge',
    to: req.currentUser?.email,
    subject: 'Password change',
    html: `<h2>Your new password is: ${newPassword} </h2>`,
  });

  res.status(StatusCodes.OK).send({ newPassword });
};

export { resetPassword };
