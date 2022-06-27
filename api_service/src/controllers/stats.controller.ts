import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotAuthorizedError } from '../errors';
import { Stock } from '../models/Stock';

const stats = async (req: Request, res: Response) => {
  if (req.currentUser?.role !== 'user') {
    throw new NotAuthorizedError();
  }
  const stats = await Stock.aggregate([
    { $group: { _id: '$name', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $project: { stock: '$_id', _id: 0, times_requested: '$count' } },
  ]);
  res.status(StatusCodes.OK).send(stats);
};

export { stats };
