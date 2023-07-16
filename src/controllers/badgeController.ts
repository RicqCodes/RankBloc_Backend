import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import Badge from "../models/badgesModel";

export const createBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const badge = await Badge.create(req.body);

    res.status(201).json({
      status: "success",
      message: `${req.body.name} Badge created succesfully`,
    });
  }
);

export const getAllBadges = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteBadge = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
