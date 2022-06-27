import { json, Request, Response } from 'express';
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, StockServiceConnectionError } from '../errors';
import { Stock, StockAttrs } from '../models/Stock';
import csv from 'csvtojson';

const requestStock = async (req: Request, res: Response) => {
  const stock = req.query.q;
  if (!stock) {
    throw new BadRequestError('No stock provided');
  }
  try {
    const { data } = await axios(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/stock/query?q=${stock}`,
      {
        headers: {
          Host: 'nodechallenge.com',
        },
      }
    );
    const jsonData = await csv().fromString(data);

    const stockData = new Stock<StockAttrs>({
      name: jsonData[0].Name,
      symbol: jsonData[0].Symbol,
      open: jsonData[0].Open,
      high: jsonData[0].High,
      low: jsonData[0].Low,
      close: jsonData[0].Close,
      requestedBy: req.currentUser!.id,
      requestedAt: new Date(),
    });
    await stockData.save();
    res.status(StatusCodes.OK).send(jsonData[0]);
  } catch (error) {
    throw new StockServiceConnectionError();
  }
};

export { requestStock };
