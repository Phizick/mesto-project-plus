import { Request, Response } from 'express';
import ErrorHandler from '../errors/errors';

export default function errorMiddleware(err: any, req: Request, res: Response) {
  // @ts-ignore
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json('server error');
}
