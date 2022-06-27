import { Request, Response } from 'express';

import HttpError, { ErrorResponse } from '../errors/HttpError';

export interface ErrorBody {
  errors: ErrorResponse[];
}

const errorHandler = (err: Error, req: Request, res: Response, next): void => {
  if (err instanceof HttpError) {
    const errorBody: ErrorBody = {
      errors: err.serializeErrors(),
    };

    res.status(err.statusCode).send(errorBody);
  } else {
    console.error('ErrorHandler: Server Error 500');

    console.error(err);

    res.status(500).send({
      errors: [{ message: 'Something went wrong' }],
    });
  }
};

export default errorHandler;
