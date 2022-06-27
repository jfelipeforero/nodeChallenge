import { CustomError } from './custom-error';

export class StockServiceConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error connecting to stock service';
  constructor() {
    super('Error connecting to stock service');

    Object.setPrototypeOf(this, StockServiceConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
