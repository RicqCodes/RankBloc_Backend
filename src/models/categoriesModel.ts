import { Schema, model } from "mongoose";
import { ICategory } from "../interfaces/Category";

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category = model<ICategory>("Category", CategorySchema);

export default Category;
