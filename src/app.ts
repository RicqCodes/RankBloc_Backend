import express from "express";

import userRoutes from "./routes/userRoutes";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRoutes);

// unhandled routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
