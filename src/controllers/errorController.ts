import { NextFunction, Request, Response } from "express";

import AppError from "../utils/appError";

const handleCastErrorDB = (err: any): AppError => {
  return new AppError(`invalid ${err.path}: ${err.value}`, 400);
};

const handleDuplicateFieldsDB = (err: any): AppError => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  return new AppError(
    `Duplicate field value: ${value}. Please use another value`,
    400
  );
};

const handleValidationErrorDB = (err: any): AppError => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

// Error to send during development
const errorForDevelopment = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Error to send during production
const errorForProduction = (err: AppError, res: Response) => {
  // Only send operational error to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // programming error, we do not want to send to client
  } else {
    res.status(500).json({ status: "error", message: "Something went wrong" });
  }
};

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "development") {
    errorForDevelopment(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastErrorDB(err);
    if (error.code === 11000) error = handleDuplicateFieldsDB(err);
    if (error.name === "ValidationError") err = handleValidationErrorDB(err);

    errorForProduction(err, res);
  }
};

export default globalErrorHandler;
