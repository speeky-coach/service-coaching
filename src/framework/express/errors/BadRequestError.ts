import HttpError, { ErrorResponse } from './HttpError';

class BadRequestError extends HttpError {
  public errorCode: string | number;
  public statusCode = 400;
  public errors: ErrorResponse[] | null = null;

  constructor(data: string | ErrorResponse[] = 'Bad Request', errorCode?: string | number) {
    super(typeof data === 'string' ? data : 'Bad Request');

    this.statusCode = this.statusCode;
    this.errorCode = errorCode || this.statusCode;

    if (typeof data !== 'string') {
      this.errors = data;
    }

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    if (this.errors) {
      return this.errors;
    }

    return [{ code: this.errorCode, message: this.message }];
  }
}

export default BadRequestError;
