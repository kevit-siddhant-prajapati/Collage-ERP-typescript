"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsLogger = void 0;
/**
 * This file is responsible for generate log of students differnt operation
*/
var winston_1 = require("winston");
/**
 * @description below given method method set different property of logs
 * @param transports {Array} - the property that are set while storing log
 * @param levels - set the level of current log
*/
exports.studentsLogger = (0, winston_1.createLogger)({
    levels: winston_1.config.syslog.levels,
    transports: [
        new winston_1.transports.File({
            filename: 'logs/students.log',
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(function (info) { return "".concat(info.level, " : ").concat([info.timestamp], " : ").concat(info.message); })),
        })
    ]
});
// module.exports = {
//     studentsLogger,
//     transactionLogger
// }
