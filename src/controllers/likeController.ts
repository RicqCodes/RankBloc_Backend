import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

export const like = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { likeType, typeId } = req.params;

    if (likeType === "comments") {
      // Run this if entity is a comment
    } else if (likeType === "likes") {
      // Run this if entity is a like
    }
  }
);

export const unlike = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getLikes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
