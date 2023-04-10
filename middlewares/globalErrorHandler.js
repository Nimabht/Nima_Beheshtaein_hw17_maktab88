const winston = require("winston");
require("winston-mongodb");

const options = {
  file: {
    level: "info",
    filename: "info.log",
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 10,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
  },
  console: {
    level: "debug",
    handleExceptions: true,
    format: winston.format.combine(winston.format.simple()),
  },
  dataBase: {
    level: "error",
    db: "mongodb://localhost/HW17",
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
    new winston.transports.MongoDB(options.dataBase),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = (Error, req, res, next) => {
  if (
    !Error.statusCode ||
    Error.statusCode.toString().startsWith("5")
  ) {
    logger.error(Error.message, { metadata: Error });
  }
  res.status(Error.statusCode || 500);
  res.send({
    error: Error.status || "error",
    message: Error.statusCode.toString().startsWith("5")
      ? "Internal Server Error"
      : Error.message,
  });
};
