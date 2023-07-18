import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import Share from "../models/sharesModel";
import { ApiFeatures } from "../utils/apiFeatures";
import AppError from "../utils/appError";

export const createShare = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId, userId } = req.body;

    Share.create({ blogPost: postId, user: userId });

    res.status(201).json({
      status: "sucess",
      message: "Category successfully created",
    });
  }
);

export const getSharesForPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params;

    const shares = await Share.find({ blogPost: postId }).populate("user");

    if (!shares) {
      next(new AppError("No share for this post", 404));
    }

    res.status(200).json({
      status: "success",
      results: shares.length,
      data: {
        shares,
      },
    });
  }
);

export const getAllShares = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new ApiFeatures(Share.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const shares = await features.query;

    res.status(200).json({
      status: "success",
      results: shares.length,
      data: {
        shares,
      },
    });
  }
);
