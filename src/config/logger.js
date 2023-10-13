import winston from "winston"

// define logging configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
    ),
    defaultMeta: { service: 'server-log' },
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
        new winston.transports.File({ filename: 'combined.log' }), // Log all requests to a different file
    ],
})

module.exports = logger