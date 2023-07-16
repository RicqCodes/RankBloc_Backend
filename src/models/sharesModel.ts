import { Schema, model } from "mongoose";

const ShareSchema = new Schema({
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

const Share = model("Share", ShareSchema);

export default Share;
