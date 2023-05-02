import winston, { format } from 'winston';
import expressWinston from 'express-winston';

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});
