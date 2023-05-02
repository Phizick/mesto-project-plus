import winston, { format } from 'winston';
import expressWinston from 'express-winston';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new winston.transports.File({
      filename: 'request.log',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json(),
  ),
  meta: true,
  expressFormat: true,
  colorize: false,
  ignoreRoute: () => false,
});
