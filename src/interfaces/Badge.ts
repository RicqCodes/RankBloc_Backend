import { Document, Types } from "mongoose";

export interface IBadge extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  image: string;
}
