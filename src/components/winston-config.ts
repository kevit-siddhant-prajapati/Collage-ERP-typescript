// winston-config.ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const winston =  require('winston');

const env = process.env.NODE_ENV || 'development';

// Configure Winston logger based on NODE_ENV
const logger = winston.createLogger({
  transports: [
    // Use a "silent" transport to disable logging in test
    env === 'test' ? new winston.transports.Console({ silent: true }) : new winston.transports.Console(),
  ],
});

export default logger;
