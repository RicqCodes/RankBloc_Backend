import mongoose from "mongoose";

import { port } from "./config";
import AppError from "./utils/appError";

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTION!, SHUTTING DOWN");
  process.exit(1);
});

import app from "./app";

const DB_URI = process.env.DATABASE?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD || ""
);

mongoose
  .connect(DB_URI || "")
  .then(() => {
    console.log("Mongodb Connection successful");
  })
  .catch((err) => {
    console.log("Mongo connection error ", err);
  });

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err: AppError) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION!, SHUTTING DOWN");
  server.close(() => {
    process.exit(1);
  });
});
