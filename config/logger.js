import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.simple()),
    }),
  ],
});

export default logger;
