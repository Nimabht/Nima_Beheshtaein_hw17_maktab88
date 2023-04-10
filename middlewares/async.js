const { AppError } = require("../utils/appError");

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  };
}

module.exports = asyncMiddleware;
