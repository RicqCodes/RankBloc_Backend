import { NextFunction, Request, Response } from "express";
import parser from "html-metadata-parser";

import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getMetadata = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.query;

    const metadata = await parser(url as string);
    if (!metadata) {
      next(new AppError("An error occurred", 500));
    }
    res.status(200).json({
      status: "success",
      data: metadata,
    });
  }
);
