function asyncRouteHandler(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    } finally {
      // ignore
    }
  };
}
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
function interceptor(req, res, next) {
  console.log(`ROUTE "${req.originalUrl}" INITIATED`);
  next();
}

async function errorHandler(error, req, res, next) {
  res
    .status(error.statusCode || 400)
    .json({ success: false, message: error.message });
}

module.exports = { CustomError, asyncRouteHandler, interceptor, errorHandler };