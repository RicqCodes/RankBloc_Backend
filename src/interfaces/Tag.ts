import { Document, Types } from "mongoose";

export interface ITag extends Document {
  _id: Types.ObjectId;
  name: string;
}
