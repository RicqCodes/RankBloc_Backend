import mongoose from "mongoose";

import { port } from "./config";
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

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
