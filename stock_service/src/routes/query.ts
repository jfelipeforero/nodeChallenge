import express, { Request, Response } from 'express';
import axios from 'axios';
import { StatusCodes } from 'http-status-codes';
import { noStockFound } from '../errors';

const router = express.Router();

router.get('/stock/query', async (req: Request, res: Response) => {
  const stock = req.query.q;
  try {
    const { data } = await axios.get(
      `https://stooq.com/q/l/?s=${stock}&f=sd2t2ohlcvn&h&e=csv`
    );
    res.status(StatusCodes.OK).send(data);
  } catch (error) {
    throw new noStockFound();
  }
});

export { router as queryRouter };
