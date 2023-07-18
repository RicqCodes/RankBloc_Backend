import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import Badge from "../models/badgesModel";
import { ApiFeatures } from "../utils/apiFeatures";
import AppError from "../utils/appError";

export const createBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await Badge.create(req.body);

    res.status(201).json({
      status: "success",
      message: `${req.body.name} Badge created succesfully`,
    });
  }
);

export const getAllBadges = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const features = new ApiFeatures(Badge.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const badges = await features.query;

    res.status(200).json({
      status: "success",
      results: badges.length,
      data: {
        badges,
      },
    });
  }
);

export const getBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const badge = await Badge.findById(req.params.id);

    if (!badge) {
      return next(new AppError("Category not found", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        badge,
      },
    });
  }
);

export const updateBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const badge = Badge.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!badge) {
      return next(new AppError("Badge not found", 404));
    }

    res.status(200).json({ status: "success", data: { badge } });
  }
);

export const deleteBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const badge = await Badge.findByIdAndDelete(req.params.kd);

    if (!badge) {
      return next(new AppError("Badge not found", 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);
