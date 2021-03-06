const winston = require("winston");

const level = process.env.LOG_LEVEL || 'debug';

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return (new Date()).toISOString();
            }
        })
    ]
});

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console());
// }



module.exports = logger