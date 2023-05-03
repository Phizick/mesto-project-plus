import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AuthorizationError from '../errors/AuthorizationError';
import { mySecretKey } from '../constants/myKey';

interface IAuthRequest extends Request {
  user?: string | JwtPayload
}
const extractedToken = (header: string) => header.replace('Bearer ', '');

const authMiddleware = (req: IAuthRequest, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return new AuthorizationError('Authorization required');
  }

  const token = extractedToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, process.env.SECRET_KEY as string || mySecretKey);
  } catch (error) {
    console.error(error);
    return new AuthorizationError('Authorization required');
  }
  req.user = payload as { _id: JwtPayload };
  next();
};

export default authMiddleware;
