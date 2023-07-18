import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import Tag from "../models/tagModels";
import { ApiFeatures } from "../utils/apiFeatures";
import AppError from "../utils/appError";

export const createTag = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const tag = await Tag.create({ name });

    res.status(201).json({
      status: "sucess",
      message: "Tag successfully created",
    });
  }
);

export const getAllTags = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new ApiFeatures(Tag.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tags = await features.query;

    res.status(200).json({
      status: "success",
      results: tags.length,
      data: {
        tags,
      },
    });
  }
);

export const getTag = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tagId } = req.params;

    const tag = await Tag.findById(tagId);

    if (!tag) {
      return next(new AppError("Tag is not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        tag,
      },
    });
  }
);

export const updateTag = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tagId = req.params.id;

    // Find the Tag by ID and update
    const tag = await Tag.findByIdAndUpdate(tagId, req.body, {
      new: true,
    });

    if (!tag) {
      return next(new AppError("Tag is not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        tag,
      },
    });
  }
);

export const deleteTag = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tagId } = req.params;

    // Find the notification by ID and delete it
    const tag = await Tag.findByIdAndDelete(tagId);

    if (!tag) {
      return next(new AppError("Tag not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
