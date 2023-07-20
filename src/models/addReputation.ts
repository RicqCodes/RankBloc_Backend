// views.js
import { Schema, model } from "mongoose";

const viewsSchema = new Schema({
  blogPost: {
    type: Schema.Types.ObjectId,
    ref: "BlogPost",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Views = model("Views", viewsSchema);

export default Views;
