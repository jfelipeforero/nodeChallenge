import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Stock } from '../models/Stock';

const userHistory = async (req: Request, res: Response) => {
  const history = await Stock.find({
    requestedBy: req.currentUser?.id,
  }).sort({ requestedAt: -1 });
  if (history.length !== 0) {
    return res.status(StatusCodes.OK).send({ history });
  }
  res.status(StatusCodes.OK).send({ message: 'Your stock history is empty' });
};

export { userHistory };
