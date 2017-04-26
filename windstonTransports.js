/* eslint no-process-env: "off" */

const winston = require('winston');

module.exports.transportLoggers = process.env.NODE_ENV === 'production'
    ? [
        new winston.transports.File({
            colorize: true,
            filename: 'out.log',
            json: true,
            level: 'verbose'
        })
    ]
    : [
        new winston.transports.Console({
            colorize: true,
            json: true,
            level: 'verbose'
        })
    ];


module.exports.transportErrorLoggers = process.env.NODE_ENV === 'production'
    ? [
        new winston.transports.File({
            colorize: true,
            filename: 'err.log',
            humanReadableUnhandledException: true,
            json: true,
            level: 'verbose'
        })
    ]
    : [
        new winston.transports.Console({
            colorize: true,
            humanReadableUnhandledException: true,
            json: true,
            level: 'verbose'
        })
    ];
