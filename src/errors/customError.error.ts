import { BaseError } from './base.error';

export class CustomError extends BaseError {
  statusCode = 0;
  reason = '';
  constructor (statusCode: number, message: string) {
    super(message)
    this.statusCode = statusCode;
    this.reason = message;
    // only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  serializeErrors () {
    return [
      { message: this.reason }
    ]
  }
}
