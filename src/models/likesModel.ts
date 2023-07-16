import { Schema, model } from "mongoose";

const LikeSChema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likedEntity: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: "likedEntityType",
  },
  linkedEntityType: {
    type: String,
    required: true,
    enum: ["BlogPost", "Comment"],
  },
});

const Like = model("Like", LikeSChema);

export default Like;
