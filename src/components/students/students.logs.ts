/**
 * This file is responsible for generate log of students differnt operation
*/
import { createLogger, format, transports, config } from 'winston';
import logger from '../winston-config';
logger.info('Working in development environment');
/**
 * @description below given method method set different property of logs
 * @param transports {Array} - the property that are set while storing log
 * @param levels - set the level of current log
*/
export const studentsLogger = createLogger({
    levels: config.syslog.levels,
    transports : [
        new transports.File({ 
            filename: 'logs/students.log' ,
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
                format.printf((info: { level: string; timestamp: string; message: string; }) => `${info.level} : ${[info.timestamp]} : ${info.message}`)
            ),
        })
     ]
});



// module.exports = {
//     studentsLogger,
//     transactionLogger
// }

