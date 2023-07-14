class AppError extends Error {
  status: string;
  constructor(
    message: string,
    public statusCode: number,
    public isOperational = true
  ) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
