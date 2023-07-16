import { Schema, model } from "mongoose";
import { CustomRequest } from "../interfaces/Custom";
import { NextFunction } from "express";
import { IUser } from "../interfaces/User";

const badgeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Badge = model("Badge", badgeSchema);

export default Badge;
