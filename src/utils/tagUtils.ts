import mongoose from "mongoose";
import Tag from "../models/tagModels";

type tagArray = string[];

const handleTags = async (tags: tagArray) => {
  const tagIds = [];

  for (const tag of tags) {
    if (mongoose.Types.ObjectId.isValid(tag)) {
      tagIds.push(tag);
    } else {
      // Check if the tag already exists in the database
      const existingTag = await Tag.findOne({ name: tag });

      if (existingTag) {
        tagIds.push(existingTag._id);
      } else {
        // Create a new tag document and add it to the database
        const newTag = await Tag.create({ name: tag });
        tagIds.push(newTag._id);
      }
    }
  }

  return tagIds;
};

export default handleTags;
