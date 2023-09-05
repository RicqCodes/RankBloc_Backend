import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import BlogPost from "../models/blogPostsModel";
import handleFindOrCreate from "../utils/tagUtils";
import { IUser } from "../interfaces/User";
import AppError from "../utils/appError";
import { ApiFeatures } from "../utils/apiFeatures";
import User from "../models/userModel";
import Views from "../models/addReputation";
import { Document, Model, Types } from "mongoose";
import Tag from "../models/tagModels";
import Category from "../models/categoriesModel";
import { ITag } from "../interfaces/Tag";

interface customRequest extends Request {
  user: IUser;
}

export const createBlogPost = catchAsync(
  async (req: customRequest, res: Response, next: NextFunction) => {
    const { title, content, images, tags = [], categories = [] } = req.body;

    let tagIds: Types.ObjectId[] = [];
    let categoryIds: Types.ObjectId[] = [];

    if (tags.length > 0) {
      tagIds = await handleFindOrCreate(tags, Tag);
    }

    if (categories.length > 0) {
      // categoryIds = await handleFindOrCreate(categories, Category);
    }

    const author = req.user._id;

    await BlogPost.create({
      title,
      content,
      images,
      categories: categoryIds,
      author,
      tags: tagIds,
    });

    // Increment the reputation score of the author
    const incrementBy = process.env.POST_CREATED;
    await User.findByIdAndUpdate(author, { $inc: { reputation: incrementBy } });

    res.status(201).json({
      status: "success",
      message: "Your post has been published",
    });
  }
);

export const getAllBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Execute query
    const features = new ApiFeatures(BlogPost.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const blogPosts = await features.query;

    res.status(200).json({
      status: "success",
      results: blogPosts.length,
      data: {
        blogPosts,
      },
    });
  }
);

export const getBlogPost = catchAsync(
  async (req: customRequest, res: Response, next: NextFunction) => {
    const blogPost = await BlogPost.findById(req.params.id);
    const viewer = req.user._id;

    if (!blogPost) {
      return next(new AppError("This blog post does not exist", 404));
    }

    // Increment the reputation score of the author for views
    const incrementBy = process.env.POST_VIEWED;
    await User.findByIdAndUpdate(blogPost?.author, {
      $inc: { reputation: incrementBy },
    });

    // Check if the view is already recorded
    const existingView = await Views.findOne({
      blogPost: blogPost?._id,
      user: viewer,
    });

    if (!existingView) {
      // View is unique, increment the reputation score of the blog post creator
      const incrementBy = process.env.POST_VIEWED; // Specify the amount to increment by
      await User.findByIdAndUpdate(blogPost?.author, {
        $inc: { reputation: incrementBy },
      });

      // Store the user's view in the views collection
      await Views.create({ blogPost: blogPost?.id, user: viewer });
    }

    res.status(200).json({
      status: "success",
      data: {
        blogPost,
      },
    });
  }
);

export const updateBlogPost = catchAsync(
  async (req: customRequest, res: Response, next: NextFunction) => {
    const blogPost = await BlogPost.findById(req.params.id);
    const userId = req.user._id;

    // Check if the blog post belongs to the authenticated user
    if (
      blogPost?.author.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return next(new AppError("Unauthorized", 404));
    }

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.query,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({ status: "success", data: updatedBlogPost });
  }
);

export const deleteBlogPost = catchAsync(
  async (req: customRequest, res: Response, next: NextFunction) => {
    const blogPost = await BlogPost.findById(req.params.id);
    const userId = req.user._id;

    // Check if the blog post belongs to the authenticated user
    if (
      blogPost?.author.toString() !== userId.toString() ||
      req.user.role !== "admin"
    ) {
      return next(new AppError("Unauthorized", 404));
    }

    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    await BlogPost.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
