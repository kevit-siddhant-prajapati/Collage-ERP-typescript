/**
 * This file is responsible for generate log of students differnt operation
*/
import { createLogger, format, transports, config } from 'winston';

/**
 * @description below given method method set different property of logs
 * @param transports {Array} - the property that are set while storing log
 * @param levels - set the level of current log
*/
export let studentsLogger = createLogger({
    levels: config.syslog.levels,
    transports : [
        new transports.File({ 
            filename: 'logs/students.log' ,
            format: format.combine(
                format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss'}),
                format.printf(info => `${info.level} : ${[info.timestamp]} : ${info.message}`)
            ),
        })
     ]
});



// module.exports = {
//     studentsLogger,
//     transactionLogger
// }

