import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blogPost: {
      type: Schema.Types.ObjectId,
      ref: "BlogPost",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", CommentSchema);

export default Comment;
