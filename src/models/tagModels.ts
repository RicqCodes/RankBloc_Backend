import { Schema, model } from "mongoose";
import { ITag } from "../interfaces/Tag";

const TagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tag = model<ITag>("Tag", TagSchema);

export default Tag;
