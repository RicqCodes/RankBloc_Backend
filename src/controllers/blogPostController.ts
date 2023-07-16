import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";

export const createBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getAllBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteBlogPost = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
