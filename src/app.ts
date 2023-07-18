import express from "express";

import routes from "./routes";

import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";

const app = express();

app.use(express.json());

// Entire application routes
app.use("api/v1", routes);

// unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global application error handler
app.use(globalErrorHandler);

export default app;
