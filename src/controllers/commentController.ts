import { Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

import Comment from "../models/commentsModel";
import { CustomRequest } from "../interfaces/Custom";
import BlogPost from "../models/blogPostsModel";
import AppError from "../utils/appError";
import mongoose from "mongoose";

export const createComment = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { postId, text } = req.body;
    const author = req.user._id;

    // Create the comment
    const comment = await Comment.create({ blogPost: postId, text, author });

    // Add the new comment ID to the comments array in the blog post
    await BlogPost.findByIdAndUpdate(
      postId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.status(201).json({
      status: "success",
      data: {
        comment,
      },
    });
  }
);

export const getBlogPostComments = catchAsync(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const blogPostId = req.params.blogPostId;

    // Find the blog post
    const blogPost = await BlogPost.findById(blogPostId);

    if (!blogPost) {
      next(new AppError("Blog post not found", 404));
    }

    // Aggregate pipeline to fetch comments and their associated likes
    const commentsWithLikes = await Comment.aggregate([
      { $match: { blogPost: new mongoose.Types.ObjectId(blogPostId) } },
      {
        $lookup: {
          from: "likes",
          let: { commentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$likedEntity", "$$commentId"] },
                    { $eq: ["$likedEntityType", "Comment"] },
                  ],
                },
              },
            },
          ],
          as: "likes",
        },
      },
      {
        $addFields: {
          likes: "$likes",
        },
      },
    ]);

    res.status(200).json({
      status: "success",
      data: {
        blogPost,
        comments: commentsWithLikes,
      },
    });
  }
);
