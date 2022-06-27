import { Schema, model } from 'mongoose';

interface StockAttrs {
  name: string;
  symbol: string;
  open: number;
  high: number;
  low: number;
  close: number;
  requestedBy: Object;
  requestedAt: Date;
}

const stockSchema = new Schema<StockAttrs>(
  {
    name: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
    open: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    low: {
      type: Number,
      required: true,
    },
    close: {
      type: Number,
      required: true,
    },
    requestedBy: {
      type: Object,
      required: true,
      ref: 'User',
    },
    requestedAt: {
      type: Date,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.id, delete ret.__v;
      },
    },
  }
);

const Stock = model<StockAttrs>('Stock', stockSchema);

export { Stock, StockAttrs };
