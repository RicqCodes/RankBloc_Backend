import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";
import xss from "xss";
import cors from "cors";
import hpp from "hpp";

import routes from "./routes";

import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";

const app = express();

// Global middlewares

// Configure CORS to allow requests only from onlt the frontend origin (http://localhost:3000)
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // Allow cookies and other credentials
};

app.use(cors(corsOptions)); // Enable CORS only for the specified origin
// Handle OPTIONS request for preflight
app.options("*", cors(corsOptions));

// Set security HTTP headers
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
// Limit request for api from same IP
app.use("api/v1", limiter);

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));

// Data sanitization against noSQL query injection
app.use(ExpressMongoSanitize());

// Data sanitization against scripting attacks
// app.use(xss("<script></script>"));

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

// Entire application routes
app.use("/api/v1", routes);

// unhandled routesx
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global application error handler
app.use(globalErrorHandler);

export default app;
