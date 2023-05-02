import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import ErrorHandler from '../errors/BadRequestError';

type AuthMiddlewareConfig = {
  headerName: string;
  authType: string;
  secretKey: string;
};

const defaultConfig: AuthMiddlewareConfig = {
  headerName: 'authorization',
  authType: 'Bearer',
  secretKey: 'any key',
};
// eslint-disable-next-line max-len
const verifyToken = (token: string, secretKey: string): JwtPayload => jwt.verify(token, secretKey) as JwtPayload;
const extractBearerToken = (header: string, authType: string): string => header.replace(`${authType} `, '');
// eslint-disable-next-line max-len
const authMiddleware = (config: AuthMiddlewareConfig = defaultConfig) => (req: any, res: Response, next: NextFunction): void => {
  const { headerName, authType, secretKey } = config;
  const headerValue = req.headers[headerName] as string | undefined;

  if (!headerValue || !headerValue.startsWith(`${authType} `)) {
    return next(ErrorHandler.authorization('authorization required'));
  }

  const token = extractBearerToken(headerValue, authType);

  let payload: JwtPayload | undefined;
  try {
    payload = verifyToken(token, secretKey);
  } catch (error) {
    return next(ErrorHandler.authorization('authorization required'));
  }
  req.user = { _id: payload } as { _id: JwtPayload };
  next();
};
export default authMiddleware;
