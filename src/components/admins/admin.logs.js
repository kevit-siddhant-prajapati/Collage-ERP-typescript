"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogger = void 0;
/**
 * This file is responsible for generate log of admin with different operation
*/
var winston_1 = require("winston");
/**
 * @description below given method method set different property of logs
 * @param transports {Array} - the property that are set while storing log
 * @param levels - set the level of current log
*/
exports.adminLogger = (0, winston_1.createLogger)({
    levels: winston_1.config.syslog.levels,
    transports: [
        new winston_1.transports.File({
            filename: 'logs/admin.log',
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.format.printf(function (info) { return "".concat(info.level, " : ").concat([info.timestamp], " : ").concat(info.message); })),
        })
    ]
});
