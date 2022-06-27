import { CustomError } from './custom-error';

export class noStockFound extends CustomError {
  statusCode = 500;
  reason = 'No stock was found with the name provided';
  constructor() {
    super('No stock was found with the name provided');

    Object.setPrototypeOf(this, noStockFound.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
