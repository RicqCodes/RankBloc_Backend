import mongoose, { Types, Model, Document } from "mongoose";
import { ITag } from "../interfaces/Tag";
import { ICategory } from "../interfaces/Category";

type typeArray = string[];

const handleFindOrCreate = async (
  entities: typeArray,
  model: Model<ICategory | ITag>
) => {
  const ids: Types.ObjectId[] = [];

  for (const entity of entities) {
    if (mongoose.Types.ObjectId.isValid(entity)) {
      ids.push(new mongoose.Types.ObjectId(entity));
    } else {
      // Check if the entity already exists in the database
      const existingEntity = await model.findOne({ name: entity });

      if (existingEntity) {
        ids.push(existingEntity._id);
      } else {
        // Create a new entity document and add it to the database
        const newentity = await model.create({ name: entity });
        ids.push(newentity._id);
      }
    }
  }

  return ids;
};

export default handleFindOrCreate;
