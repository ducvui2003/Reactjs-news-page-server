import { StatusCodes } from "http-status-codes";

export const errorHandlingMiddleware = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  const responseError = {
    statusCode: err.statusCode,
    message: err.message || StatusCodes[err.statusCode],
  };
  // Include stack trace in development mode
  if (process.env.NODE_ENV === "development") {
    responseError.stack = err.stack;
    console.log(err);
  }
  res.status(err.statusCode).json(responseError);
};
