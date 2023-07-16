import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

export const createBadge = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

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
