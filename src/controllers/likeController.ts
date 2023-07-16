import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { CustomRequest } from "../interfaces/Custom";

import Like from "../models/likesModel";
import User from "../models/userModel";
import BlogPost from "../models/blogPostsModel";
import Comment from "../models/commentsModel";

export const likeEntity = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { entityId, entityType } = req.params;
    const userId = req.user._id;

    // Check if there is an existing like for the user and entity combination
    const existingLike = await Like.findOne({
      likedEntity: entityId,
      likedEntityType: entityType,
      user: userId,
    });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });

      const decrementUser = process.env.LIKE || 0;

      await User.findByIdAndUpdate(userId, {
        $inc: { reputation: -decrementUser },
      });

      // Retrieve the author ID of the liked entity
      let entityAuthorId;

      if (entityType === "BlogPost") {
        const blogPost = await BlogPost.findById(entityId);

        // Decrement the blogpost likes
        await BlogPost.findByIdAndUpdate(blogPost?.id, {
          $inc: { likeCount: -1 },
        });

        entityAuthorId = blogPost?.author;
      } else if (entityType === "Comment") {
        const comment = await Comment.findById(entityId);
        entityAuthorId = comment?.author;
      }

      // Decrement the reputation of the author of the liked entity
      if (entityAuthorId) {
        const decrementBy = process.env.LIKE || 0;
        await User.findByIdAndUpdate(entityAuthorId, {
          $inc: { reputation: -decrementBy },
        });
      }

      // Return the success response
      return res
        .status(200)
        .json({ message: "Entity like removed successfully" });
    }

    // Perform the like and store it in the Likes collection if existingLike is false
    await Like.create({
      likedEntity: entityId,
      likedEntityType: entityType,
      user: userId,
    });

    // Increment the reputation of the user who liked the entity
    const incrementBy = process.env.LIKE; // Specify the amount to increment by
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: incrementBy },
    });

    // Retrieve the author ID of the liked entity
    let entityAuthorId;

    if (entityType === "BlogPost") {
      const blogPost = await BlogPost.findById(entityId);

      // Increment blogpost likes
      await BlogPost.findByIdAndUpdate(blogPost?.id, {
        $inc: { likeCount: 1 },
      });

      entityAuthorId = blogPost?.author;
    } else if (entityType === "Comment") {
      const comment = await Comment.findById(entityId);
      entityAuthorId = comment?.author;
    }

    if (entityAuthorId) {
      const incrementBy = 1; // Specify the amount to increment by
      await User.findByIdAndUpdate(entityAuthorId, {
        $inc: { reputation: incrementBy },
      });
    }

    // Return the success response
    res.status(200).json({ message: "Entity liked successfully" });
  }
);

export const getEntityLikes = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { entityId, entityType } = req.params;

    // Find all likes for the specified entity ID and entity type
    const likes = await Like.find({
      likedEntity: entityId,
      likedEntityType: entityType,
    });

    res.status(200).json({
      status: "success",
      data: {
        likes,
      },
    });
  }
);
