import {
  Request, Response, NextFunction, ErrorRequestHandler,
} from 'express';

// eslint-disable-next-line max-len,no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json('На сервере произошла ошибка');
};

export default errorMiddleware;
