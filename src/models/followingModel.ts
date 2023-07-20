import mongoose, { Schema, model } from "mongoose";

const userRelationshipSchema = new Schema({
  follower: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  followee: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserRelationship = model("UserRelationship", userRelationshipSchema);

export default UserRelationship;
